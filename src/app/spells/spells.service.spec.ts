import { CreateSpellBuilder } from '@dnd-mapp/dma-resources-server/models';
import { createTestEnvironment, defaultSpell, mockSpellDB } from '@dnd-mapp/dma-resources-server/test';
import { nanoid } from 'nanoid';
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

        const spellName = 'Fire Ball';
        const data = new CreateSpellBuilder().withName(spellName).build();

        expect(mockSpellDB.findFirst({ where: { name: spellName } })).toBe(null);

        const created = await service.create(data);

        expect(mockSpellDB.findFirst({ where: { name: spellName } })).not.toBe(null);
        expect(created).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: spellName,
            }),
        );
    });

    it('should not create a Spell with a non-unique name', async () => {
        const { service } = await setupTest();

        const data = new CreateSpellBuilder().withName(defaultSpell.name).build();

        expect(mockSpellDB.findMany()).toHaveLength(1);

        await expect(service.create(data)).rejects.toThrow(
            `Could not create Spell. - Reason: Name "${defaultSpell.name}" is already in use`,
        );
        expect(mockSpellDB.findMany()).toHaveLength(1);
    });

    it('should return a single Spell by ID', async () => {
        const { service } = await setupTest();

        expect(await service.getById(defaultSpell.id)).toEqual(defaultSpell);
    });

    it('should remove a Spell by ID', async () => {
        const { service } = await setupTest();

        expect(mockSpellDB.findFirst({ where: { id: defaultSpell.id } })).not.toBe(null);

        await service.removeById(defaultSpell.id);

        expect(mockSpellDB.findFirst({ where: { id: defaultSpell.id } })).toBe(null);
    });

    it('should throw a NotFoundException when removing a non-existing Spell by ID', async () => {
        const { service } = await setupTest();

        const spellId = nanoid();

        expect(mockSpellDB.findFirst({ where: { id: spellId } })).toBe(null);

        await expect(service.removeById(spellId)).rejects.toThrow(
            `Could not remove Spell with ID "${spellId}". - Reason: Spell does not exist`,
        );
    });
});
