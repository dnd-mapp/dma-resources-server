import { CreateSpellDto } from '@dnd-mapp/dma-resources-server/models';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { serverAddress } from '../utils';
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
        const baseUrl = `${serverAddress()}${response.request.url}`;

        response.status(HttpStatus.CREATED).headers({ Location: `${baseUrl}/${created.id}` });

        return created;
    }
}
