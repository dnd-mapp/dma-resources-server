import { APP_LOGGER } from '@dnd-mapp/dma-resources-server/models';
import { InMemoryLogger } from '@dnd-mapp/dma-resources-server/test';
import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';

interface TestEnvironmentParams {
    imports: (Type<unknown> | DynamicModule | Promise<DynamicModule> | ForwardReference<unknown>)[];
}

export async function createTestEnvironment(params: TestEnvironmentParams) {
    return await Test.createTestingModule({ imports: [...params.imports] })
        .overrideProvider(APP_LOGGER)
        .useClass(InMemoryLogger)
        .compile();
}
