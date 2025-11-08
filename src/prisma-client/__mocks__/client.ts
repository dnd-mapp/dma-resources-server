import { mockSpellDB } from '@dnd-mapp/dma-resources-server/test';

export class PrismaClient {
    public get spells() {
        return mockSpellDB;
    }
}
