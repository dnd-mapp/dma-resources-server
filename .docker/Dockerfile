FROM --platform=$BUILDPLATFORM node:22 AS builder

WORKDIR /server

COPY package*.json .

RUN npm ci

COPY . .

RUN npx prisma generate client && \
    npm run build && \
    rm -rf node_modules && \
    cd dist/dma-resources-server && \
    npm i

COPY .docker/health-check.js dist/dma-resources-server/health-check.js

FROM node:22-alpine

WORKDIR /server

COPY --from=builder /server/dist/dma-resources-server .

ENV DMA_HOST="0.0.0.0" \
    DMA_PORT="3000"

HEALTHCHECK CMD ["node", "/server/health-check.js"]

CMD ["node", "/server/main.js"]
