import { APP_LOGGER } from '@dnd-mapp/dma-resources-server/models';
import { PrismaClient } from '@dnd-mapp/dma-resources-server/prisma/client';
import { ConsoleLogger, Inject, Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { DatabaseConfiguration } from '../config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
    public get prismaClient() {
        return this._prismaClient;
    }
    private readonly _prismaClient: PrismaClient;

    private readonly adapter: PrismaMariaDb;
    private readonly logger: ConsoleLogger;

    public constructor(configService: ConfigService, @Inject(APP_LOGGER) logger: ConsoleLogger) {
        this.logger = logger;
        this.logger.setContext(DatabaseService.name);

        const { host, port, username, password, schema } = configService.get<DatabaseConfiguration>('database');

        this.adapter = new PrismaMariaDb({
            host: host,
            port: port,
            user: username,
            password: password,
            database: schema,
        });

        this._prismaClient = new PrismaClient({ adapter: this.adapter });
    }

    public async onModuleInit() {
        await this._prismaClient.$connect();
    }

    public async onApplicationShutdown() {
        await this._prismaClient.$disconnect();
    }
}
