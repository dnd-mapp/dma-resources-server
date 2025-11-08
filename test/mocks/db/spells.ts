import { Spell, SpellBuilder } from '@dnd-mapp/dma-resources-server/models';

class MockSpellDB {
    private records: Record<string, Spell> = {};

    public findMany() {
        return Object.values(this.records);
    }

    public reset() {
        this.records = {
            [defaultSpell.id]: defaultSpell,
        };
    }
}

export const defaultSpell = new SpellBuilder().withId().withName('Spell name').build();

export const mockSpellDB = new MockSpellDB();
