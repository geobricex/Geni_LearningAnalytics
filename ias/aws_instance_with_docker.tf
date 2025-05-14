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
  ami                         = "ami-0a887e401f7654935" # Amazon Linux 2 AMI (HVM), SSD Volume Type
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.deployer.key_name
  associate_public_ip_address = true

  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo amazon-linux-extras install docker -y
    sudo service docker start
    sudo usermod -aG docker ec2-user
    sudo chkconfig docker on
  EOF

  tags = {
    Name = "docker-server"
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
