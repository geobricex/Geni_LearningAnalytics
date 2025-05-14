# Comandos para conectar a una instancia EC2 de AWS usando SSH

A continuación se detallan los pasos y comandos necesarios para conectarse a una instancia EC2 de AWS usando una clave SSH en sistemas Windows.

## Paso 1: Descargar Git Bash (si no lo tienes)
[Descarga Git Bash aquí](https://git-scm.com/downloads)

## Paso 2: Verificar el nombre de usuario
Abre PowerShell y ejecuta el siguiente comando para verificar tu nombre de usuario:
whoami
El resultado será algo como: `DESKTOP-XXXXXX\geova`.

## Paso 3: Asignar permisos a la clave privada (PEM)

### 3.1. Abre PowerShell como administrador
Haz clic derecho sobre PowerShell y selecciona **"Ejecutar como administrador"**.

### 3.2. Establecer permisos de la clave privada

Usa el siguiente comando para otorgar permisos completos solo a tu usuario, reemplazando `zombitron\geova` por el nombre de tu usuario:
icacls .\deployer-key.pem /grant zombitron\geova:F

### 3.3. Verificar los permisos
Verifica que los permisos se hayan asignado correctamente con el siguiente comando:
icacls .\deployer-key.pem

El resultado debería ser algo como:
deployer-key.pem zombitron\geova:(F)

## Paso 4: Conectar a la instancia EC2

Una vez que los permisos están correctos, puedes conectarte a la instancia EC2 utilizando SSH con el siguiente comando:
ssh -i ./deployer-key.pem ec2-user@<Public_IP>

Reemplaza `<Public_IP>` con la dirección IP pública de la instancia EC2, por ejemplo, `54.205.138.61`.

## Paso 5: Verificar Docker
Una vez conectado, puedes verificar que Docker esté funcionando ejecutando:
docker --version
sudo docker run hello-world

Esto debería confirmar que Docker está instalado y funcionando correctamente.

---

¡Listo! Ahora puedes conectarte a tu instancia EC2 de AWS usando la clave SSH correctamente configurada.
