import { CreateSpellBuilder } from '@dnd-mapp/dma-resources-server/models';
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

        expect(await service.getAll()).toEqual([defaultSpell]);
    });

    it('should create a new Spell', async () => {
        const { service } = await setupTest();

        expect(await service.create(new CreateSpellBuilder().withName('Fire Ball').build())).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: 'Fire Ball',
            }),
        );
    });

    it('should not create a Spell with a non-unique name', async () => {
        const { service } = await setupTest();

        await expect(service.create(new CreateSpellBuilder().withName(defaultSpell.name).build())).rejects.toThrow(
            `Could not create Spell. - Reason: Name "${defaultSpell.name}" is already in use`,
        );
    });

    it('should return a single Spell by ID', async () => {
        const { service } = await setupTest();

        expect(await service.getById(defaultSpell.id)).toEqual(defaultSpell);
    });
});
