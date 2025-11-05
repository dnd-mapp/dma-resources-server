import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app';

const app = await NestFactory.create(AppModule, new FastifyAdapter());

const port = process.env['DMA_PORT'] ?? 3000;
const host = process.env['DMA_HOST'] ?? 'localhost';

app.setGlobalPrefix('server');

app.enableShutdownHooks();

await app.listen(port, host, () => {
    Logger.log(`The D&D Mapp Resources server is available on: http://${host}:${port}/server`, 'NestApplication');
});
