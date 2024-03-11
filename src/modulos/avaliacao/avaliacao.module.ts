import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvaliacaoEntity } from './avaliacao.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ReceitaEntity } from '../receitas/receita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AvaliacaoEntity, UsuarioEntity, ReceitaEntity]),
  ],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService],
  exports: [AvaliacaoService],
})
export class AvaliacaoModule {}
