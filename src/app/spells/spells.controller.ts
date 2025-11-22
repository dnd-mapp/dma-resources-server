import { CreateSpellDto, Spell } from '@dnd-mapp/dma-resources-server/models';
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common';
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

    @Put('/:id')
    public async update(@Param('id') id: string, @Body() data: Spell) {
        if (data.id !== id) {
            throw new BadRequestException(
                `Could not update Spell with ID "${id}". - Reason: ID in body "${data.id}" does not match URL parameter`,
            );
        }
        return await this.spellsService.update(data);
    }

    @Delete('/:id')
    public async removeById(@Param('id') id: string, @Res({ passthrough: true }) response: FastifyReply) {
        await this.spellsService.removeById(id);

        response.status(HttpStatus.NO_CONTENT);
    }
}
