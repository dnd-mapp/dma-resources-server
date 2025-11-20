import { createTestEnvironment, defaultSpell } from '@dnd-mapp/dma-resources-server/test';
import { SpellsController } from './spells.controller';
import { SpellsModule } from './spells.module';

jest.mock('../../prisma-client/client');

describe('SpellsController', () => {
    async function setupTest() {
        const app = await createTestEnvironment({
            imports: [SpellsModule],
        });

        return {
            controller: app.get(SpellsController),
        };
    }

    it('should get all Spells', async () => {
        const { controller } = await setupTest();

        expect(await controller.getAll()).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: defaultSpell.id })]),
        );
    });
});
