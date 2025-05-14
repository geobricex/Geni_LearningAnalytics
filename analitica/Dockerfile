# Usar una imagen base de Python 3.10
FROM python:3.10-slim

# Instalar las dependencias necesarias para compilar paquetes como scikit-learn
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    libatlas-base-dev \
    liblapack-dev \
    gfortran \
    cython3 \
    python3-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Actualizar pip a la última versión para evitar problemas de compatibilidad
RUN pip install --no-cache-dir --upgrade pip

# Instalar versiones específicas de numpy y pandas para evitar incompatibilidades
RUN pip install --no-cache-dir numpy==2.2.4 pandas==2.2.3

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de dependencias (requirements.txt) al contenedor
COPY requirements.txt /app/

# Instalar las dependencias en el contenedor
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente de la aplicación al contenedor (todo el proyecto Django)
COPY . /app/

# Exponer el puerto 8000 para la aplicación Django
EXPOSE 8000

# Ejecutar el servidor Django cuando el contenedor inicie
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
