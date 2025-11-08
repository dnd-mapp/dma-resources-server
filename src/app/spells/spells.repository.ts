import { Spell } from '@dnd-mapp/dma-resources-server/models';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database';
import { createInstances } from '../utils';

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
}
