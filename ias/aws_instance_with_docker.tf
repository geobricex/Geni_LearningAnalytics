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

  # Script de configuración para instalar Docker y Docker Compose
  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo amazon-linux-extras install docker -y
    sudo service docker start
    sudo usermod -aG docker ec2-user
    sudo chkconfig docker on

    # Instalar Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    # Clonar el proyecto desde GitHub (ajusta la URL a tu repositorio)
    sudo yum install git -y
    cd /home/ec2-user
    git clone https://github.com/usuario/proyecto.git
    cd proyecto

    # Iniciar Docker Compose
    sudo docker-compose up --build -d
  EOF

  tags = {
    Name = "docker-server"
  }

  # Seguridad: permitir tráfico HTTP y SSH
  security_groups = [aws_security_group.docker_server_sg.name]
}

# Grupo de seguridad para permitir HTTP y SSH
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
