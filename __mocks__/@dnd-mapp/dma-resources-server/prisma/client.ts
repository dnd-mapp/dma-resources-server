import { executeMockedQuery, mockSpellDB } from '@dnd-mapp/dma-resources-server/test';

export class PrismaClient {
    public get spells() {
        return mockSpellDB;
    }

    public async $queryRaw(query: string) {
        const result = executeMockedQuery(query);

        if (result instanceof Error) return Promise.reject(result);
        return Promise.resolve(result);
    }
}
