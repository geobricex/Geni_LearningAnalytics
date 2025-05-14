provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region to launch the instance."
  default     = "us-east-1"
}

resource "tls_private_key" "deployer_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = tls_private_key.deployer_key.public_key_openssh
}

resource "aws_instance" "docker_server" {
  ami                         = "ami-0a887e401f7654935"  # Amazon Linux 2 AMI (HVM), SSD Volume Type
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true

  # Script de configuración para instalar Docker, Docker Compose y desplegar el proyecto
  user_data = <<-EOF
    #!/bin/bash
    # Actualizar el sistema
    sudo yum update -y

    # Instalar Docker
    sudo amazon-linux-extras install docker -y
    sudo service docker start
    sudo usermod -aG docker ec2-user
    sudo chkconfig docker on

    # Permitir a ec2-user usar Docker sin sudo
    sudo groupadd docker
    sudo usermod -aG docker ec2-user
    sudo chown ec2-user:docker /var/run/docker.sock

    # Instalar Docker Compose v2
    sudo mkdir -p /usr/local/lib/docker/cli-plugins
    sudo curl -SL https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
    sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
    sudo ln -sf /usr/local/lib/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose
    sudo ln -sf /usr/local/lib/docker/cli-plugins/docker-compose /usr/bin/docker-compose

    # Verificar la instalación de Docker Compose
    sudo docker-compose version

    # Eliminar cualquier red residual para evitar conflictos
    existing_network=$(sudo docker network ls | grep geni_learninganalytics_my_network | awk '{print $1}')
    if [ -n "$existing_network" ]; then
      sudo docker network rm geni_learninganalytics_my_network
    fi

    # Instalar Git
    sudo yum install git -y

    # Clonar el proyecto desde GitHub
    cd /home/ec2-user
    git clone https://github.com/geobricex/Geni_LearningAnalytics.git
    cd Geni_LearningAnalytics

    # Ajustar permisos para ec2-user
    sudo chown -R ec2-user:ec2-user /home/ec2-user/Geni_LearningAnalytics

    # Crear un archivo de configuración de Docker Compose para iniciar automáticamente
    echo "[Unit]
    Description=Docker Compose App
    After=network.target docker.service
    Requires=docker.service

    [Service]
    WorkingDirectory=/home/ec2-user/Geni_LearningAnalytics
    ExecStart=/usr/bin/docker-compose up --build -d
    ExecStop=/usr/bin/docker-compose down
    Restart=always
    User=ec2-user

    [Install]
    WantedBy=multi-user.target" | sudo tee /etc/systemd/system/docker-compose-app.service

    # Habilitar el servicio para iniciar automáticamente
    sudo systemctl daemon-reload
    sudo systemctl enable docker-compose-app.service
    sudo systemctl start docker-compose-app.service
  EOF

  tags = {
    Name = "docker-server"
  }

  # Grupo de seguridad para habilitar tráfico HTTP, SSH y backend
  security_groups = [aws_security_group.docker_server_sg.name]
}

resource "aws_security_group" "docker_server_sg" {
  name_prefix = "docker-server-sg"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "local_file" "private_key" {
  content  = tls_private_key.deployer_key.private_key_pem
  filename = "./deployer-key.pem"
}

output "instance_ip" {
  description = "Public IP of the Docker server."
  value       = aws_instance.docker_server.public_ip
}

output "private_key_path" {
  description = "Path to the private key to access the instance."
  value       = local_file.private_key.filename
}
