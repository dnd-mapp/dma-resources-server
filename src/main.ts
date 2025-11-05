import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppConfiguration, AppModule } from './app';

const app = await NestFactory.create(AppModule, new FastifyAdapter());

const configService = app.get(ConfigService);
const { host, port } = configService.get<AppConfiguration>('app');

app.setGlobalPrefix('server');

app.enableShutdownHooks();

await app.listen(port, host, () => {
    Logger.log(`The D&D Mapp Resources server is available on: http://${host}:${port}/server`, 'NestApplication');
});
