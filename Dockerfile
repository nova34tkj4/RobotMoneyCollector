FROM node:16-alpine as prod

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM docker.io/nginx:alpine as web

WORKDIR /usr/share/nginx/html

COPY --from=prod /app/dist .

COPY  default.conf /etc/nginx/conf.d

EXPOSE 5173
ENTRYPOINT ["nginx", "-g", "daemon off;"]
