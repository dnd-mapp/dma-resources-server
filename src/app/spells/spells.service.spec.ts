import { createTestEnvironment, defaultSpell } from '@dnd-mapp/dma-resources-server/test';
import { SpellsModule } from './spells.module';
import { SpellsService } from './spells.service';

jest.mock('../../prisma-client/client');

describe('SpellsController', () => {
    async function setupTest() {
        const app = await createTestEnvironment({
            imports: [SpellsModule],
        });

        return {
            service: app.get(SpellsService),
        };
    }

    it('should get all Spells', async () => {
        const { service } = await setupTest();

        expect(await service.getAll()).toEqual(expect.arrayContaining([expect.objectContaining(defaultSpell)]));
    });
});
