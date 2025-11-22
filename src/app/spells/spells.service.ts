import { CreateSpellDto, Spell } from '@dnd-mapp/dma-resources-server/models';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SpellsRepository } from './spells.repository';

@Injectable()
export class SpellsService {
    private readonly spellsRepository: SpellsRepository;

    constructor(spellsRepository: SpellsRepository) {
        this.spellsRepository = spellsRepository;
    }

    public async getAll() {
        return await this.spellsRepository.findAll();
    }

    public async getById(id: string) {
        return await this.spellsRepository.findOneById(id);
    }

    public async create(data: CreateSpellDto) {
        const { name } = data;

        if (await this.isNameInUse(name)) {
            throw new BadRequestException(`Could not create Spell. - Reason: Name "${name}" is already in use`);
        }
        return await this.spellsRepository.create(data);
    }

    public async update(data: Spell) {
        const { id, name } = data;
        const spellById = await this.getById(id);

        if (spellById === null) {
            throw new NotFoundException(`Could not update Spell with ID "${id}". - Reason: Spell does not exist`);
        }
        if (await this.isNameInUse(name, id)) {
            throw new BadRequestException(
                `Could not update Spell with ID "${id}". - Reason: Name "${name}" is already in use`,
            );
        }
        return await this.spellsRepository.update(data);
    }

    public async removeById(id: string) {
        const spellById = await this.getById(id);

        if (spellById === null)
            throw new NotFoundException(`Could not remove Spell with ID "${id}". - Reason: Spell does not exist`);
        await this.spellsRepository.deleteOneById(id);
    }

    private async getByName(name: string) {
        return await this.spellsRepository.findOneByName(name);
    }

    private async isNameInUse(name: string, id: string = null) {
        const spellByName = await this.getByName(name);

        return spellByName !== null && (id === null || spellByName.id !== id);
    }
}
