# Etapa de construcción
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /frontend2

# Copiar package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente de la aplicación al contenedor
COPY . .

# Construir la aplicación Vite
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos estáticos generados por Vite desde la etapa de construcción al directorio de Nginx
COPY --from=build /frontend2/dist /usr/share/nginx/html

# Copiar archivo de configuración de Nginx personalizado si es necesario
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Iniciar Nginx cuando el contenedor se ejecute
CMD ["nginx", "-g", "daemon off;"]
