# Utilizar Node.js 18 en Alpine Linux
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Si nodemon no está en el package.json, puedes instalarlo globalmente
RUN npm install -g nodemon

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3001

# Comando para iniciar la aplicación con nodemon (usamos legacy watch para evitar problemas de archivos)
CMD ["nodemon", "--watch", "src", "--legacy-watch", "src/main.ts"]
