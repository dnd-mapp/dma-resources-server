import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthModule } from './health';

@Module({
    controllers: [AppController],
    imports: [HealthModule],
})
export class AppModule {}
