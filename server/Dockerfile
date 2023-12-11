FROM node:16-alpine as prod
WORKDIR /app
COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]
