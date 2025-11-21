import { CreateSpellDto, Spell } from '@dnd-mapp/dma-resources-server/models';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database';
import { createInstance, createInstances } from '../utils';

@Injectable()
export class SpellsRepository {
    private readonly databaseService: DatabaseService;

    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    public async findAll() {
        const queryResult = await this.databaseService.prismaClient.spells.findMany();

        return createInstances(queryResult, Spell);
    }

    public async findOneById(id: string) {
        const queryResult = await this.databaseService.prismaClient.spells.findFirst({ where: { id: id } });

        return createInstance(queryResult, Spell);
    }

    public async findOneByName(name: string) {
        const queryResult = await this.databaseService.prismaClient.spells.findFirst({ where: { name: name } });

        return createInstance(queryResult, Spell);
    }

    public async create(data: CreateSpellDto) {
        const queryResult = await this.databaseService.prismaClient.spells.create({
            data: {
                name: data.name,
            },
        });

        return createInstance(queryResult, Spell);
    }
}
