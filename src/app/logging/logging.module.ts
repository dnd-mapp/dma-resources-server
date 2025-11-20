import { APP_LOGGER } from '@dnd-mapp/dma-resources-server/models';
import { ClassProvider, ConsoleLogger, Module } from '@nestjs/common';

function provideAppLogger() {
    return {
        provide: APP_LOGGER,
        useClass: ConsoleLogger,
    } satisfies ClassProvider;
}

@Module({
    providers: [provideAppLogger()],
    exports: [APP_LOGGER],
})
export class LoggingModule {}
