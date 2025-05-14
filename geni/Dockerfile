# Etapa 1: Construcción de la aplicación Angular
FROM node:22-alpine AS build

# Configuración del entorno
ENV PATH="/app/node_modules/.bin:$PATH"

WORKDIR /app

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli --legacy-peer-deps
RUN chmod +x /usr/local/bin/ng

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar el resto del proyecto al contenedor
COPY . .

# Verificar Angular CLI y permisos
RUN ng version
RUN ls -la /usr/local/bin

# Compilar la aplicación Angular en modo producción
RUN npm run build --configuration=production

# Verificar el contenido después de la compilación
RUN ls -la /app/dist/geni/browser

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:stable-alpine

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados desde la etapa de construcción
COPY --from=build /app/dist/geni/browser/ /usr/share/nginx/html/

# Exponer el puerto 80
EXPOSE 80

# Comando de inicio de Nginx
CMD ["nginx", "-g", "daemon off;"]
