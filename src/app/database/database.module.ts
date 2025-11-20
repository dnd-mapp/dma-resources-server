import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfiguration } from '../config';
import { LoggingModule } from '../logging';
import { DatabaseService } from './database.service';

@Module({
    imports: [LoggingModule, ConfigModule.forFeature(appConfiguration)],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}
