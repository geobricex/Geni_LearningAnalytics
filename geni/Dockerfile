# Etapa 1: Construcción de la aplicación Angular
FROM node:22-alpine AS build

WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar el resto del proyecto al contenedor
COPY . .

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
