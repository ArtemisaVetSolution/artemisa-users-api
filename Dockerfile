
FROM node:18-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/src/main" ]