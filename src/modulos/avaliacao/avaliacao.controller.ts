import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  async create(
    @Body() createAvaliacaoDto: CreateAvaliacaoDto,
    @Req() req: RequisicaoComUsuario,
  ) {
    const usuarioId = req.usuario.sub;
    return this.avaliacaoService.create(usuarioId, createAvaliacaoDto);
  }

  @Get()
  async findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.avaliacaoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto,
  ) {
    return this.avaliacaoService.update(id, updateAvaliacaoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.avaliacaoService.remove(id);
  }
}
