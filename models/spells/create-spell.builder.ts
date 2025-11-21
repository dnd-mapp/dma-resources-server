import { CreateSpellDto } from '@dnd-mapp/dma-resources-server/models';

export class CreateSpellBuilder {
    private dto = new CreateSpellDto();

    public build() {
        return this.dto;
    }

    public withName(name: string) {
        this.dto.name = name;
        return this;
    }
}
