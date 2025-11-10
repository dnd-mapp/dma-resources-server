import { PrismaClient } from '@dnd-mapp/dma-resources-server/prisma/client';
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { DatabaseConfiguration } from '../config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
    public get prismaClient() {
        return this._prismaClient;
    }

    private readonly adapter: PrismaMariaDb;

    private readonly _prismaClient: PrismaClient;

    public constructor(configService: ConfigService) {
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
