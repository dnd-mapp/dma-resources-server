import { CreateSpellDto } from '@dnd-mapp/dma-resources-server/models';
import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { getServerAddress } from '../utils';
import { SpellsService } from './spells.service';

@Controller('/spells')
export class SpellsController {
    private readonly spellsService: SpellsService;

    constructor(spellsService: SpellsService) {
        this.spellsService = spellsService;
    }

    @Get()
    public async getAll() {
        return await this.spellsService.getAll();
    }

    @Post()
    public async create(@Body() data: CreateSpellDto, @Res({ passthrough: true }) response: FastifyReply) {
        const created = await this.spellsService.create(data);
        const baseUrl = `${getServerAddress(false)}${response.request.url}`;

        response.status(HttpStatus.CREATED).headers({ Location: `${baseUrl}/${created.id}` });

        return created;
    }

    @Get('/:id')
    public async getById(@Param('id') id: string) {
        const byId = await this.spellsService.getById(id);

        if (byId === null) throw new NotFoundException(`Could not find Spell with ID "${id}"`);
        return byId;
    }
}
