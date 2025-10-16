FROM --platform=$BUILDPLATFORM node:22 AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build


FROM nginx:alpine3.22

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/dma-web-client/browser /usr/share/nginx/html

COPY .docker/config.json /usr/share/nginx/html/config.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
