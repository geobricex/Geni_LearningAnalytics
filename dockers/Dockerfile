# Usar una imagen base de Python
FROM python:3.9-slim

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de dependencias (requirements.txt) al contenedor
COPY requirements.txt /app/

# Instalar las dependencias en el contenedor usando pip (sin el comando 'py')
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente de la aplicación al contenedor
COPY . /app/

# Exponer el puerto 8000 para la aplicación Django
EXPOSE 8000

# Ejecutar el servidor Django cuando el contenedor inicie
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
