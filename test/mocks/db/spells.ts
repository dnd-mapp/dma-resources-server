import { Spell, SpellBuilder } from '@dnd-mapp/dma-resources-server/models';
import { nanoid } from 'nanoid';

class MockSpellDB {
    private records: Record<string, Spell> = {};

    public findMany() {
        return Object.values(this.records);
    }

    public findFirst(args: { where: { id?: string; name?: string } }) {
        const { id, name } = args.where;

        if (id) return this.findOneById(id);
        if (name) return this.findOneByName(name);
        return null;
    }

    public create(args: { data: { name: string } }) {
        const { name } = args.data;

        const spell = {
            id: nanoid(),
            name: name,
        };
        this.records[spell.id] = spell;
        return spell;
    }

    public update(args: { where: { id: string }; data: { name: string } }) {
        const spellData = this.records[args.where.id];
        const { name } = args.data;

        this.records[args.where.id] = {
            id: spellData.id,
            name: name,
        };
        return this.records[args.where.id];
    }

    public delete(args: { where: { id: string } }) {
        const { id } = args.where;
        delete this.records[id];
    }

    public reset() {
        this.records = {
            [defaultSpell.id]: defaultSpell,
        };
    }

    private findOneById(id: string) {
        return Object.values(this.records).find((spell) => spell.id === id) ?? null;
    }

    private findOneByName(name: string) {
        return Object.values(this.records).find((spell) => spell.name === name) ?? null;
    }
}

export const defaultSpell = new SpellBuilder().withId().withName('Acid Splash').build();

export const mockSpellDB = new MockSpellDB();
