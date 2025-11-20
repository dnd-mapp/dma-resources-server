import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppConfiguration, AppModule } from './app';
import { getSSLFiles, sslEnabled } from './app/config/app.configuration';

function serverAddress(host: string, port: number) {
    let address = '';

    if (sslEnabled()) address += 'https://';
    else address += 'http://';

    address += host;

    if (!((port === 443 && sslEnabled()) || (port === 80 && !sslEnabled()))) {
        address += `:${port}`;
    }
    return `${address}/server`;
}

async function bootstrap() {
    const { cert, key } = await getSSLFiles();

    const app = await NestFactory.create(
        AppModule,
        new FastifyAdapter({
            ...(sslEnabled()
                ? {
                      https: {
                          cert: cert,
                          key: key,
                      },
                  }
                : undefined),
        }),
    );

    const configService = app.get(ConfigService);
    const { host, port } = configService.get<AppConfiguration>('app');

    app.setGlobalPrefix('server');

    app.enableShutdownHooks();

    await app.listen(port, host, () => {
        Logger.log(`The D&D Mapp Resources server is available on: ${serverAddress(host, port)}`, 'NestApplication');
    });
}

bootstrap().catch((error) => {
    console.error(error);
    process.exit(1);
});
