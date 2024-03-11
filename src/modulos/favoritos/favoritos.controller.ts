import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao.guard';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  @UseGuards(AutenticacaoGuard)
  create(
    @Body() createFavoritoDto: CreateFavoritoDto,
    @Req() req: RequisicaoComUsuario,
  ) {
    const usuarioId = req.usuario.sub;
    return this.favoritosService.create(createFavoritoDto, usuarioId);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.favoritosService.findAll(id);
  }
}
