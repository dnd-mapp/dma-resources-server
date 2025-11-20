import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions, withSerialization } from './config';
import { HealthModule } from './health';
import { SpellsModule } from './spells';

@Module({
    imports: [ConfigModule.forRoot(configModuleOptions), HealthModule, SpellsModule],
    providers: [withSerialization()],
})
export class AppModule {}
