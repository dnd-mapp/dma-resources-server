import { nanoid } from 'nanoid';
import { Spell } from './spell.entity';

export class SpellBuilder {
    private readonly spell = new Spell();

    public build() {
        return this.spell;
    }

    public withId(id?: string) {
        this.spell.id = id ?? nanoid();
        return this;
    }

    public withName(name: string) {
        this.spell.name = name;
        return this;
    }
}
