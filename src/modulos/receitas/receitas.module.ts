import { Module } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { ReceitasController } from './receitas.controller';
import { AvaliacaoEntity } from '../avaliacao/avaliacao.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceitaEntity } from './receita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AvaliacaoEntity, UsuarioEntity, ReceitaEntity]),
  ],
  controllers: [ReceitasController],
  providers: [ReceitasService],
  exports: [ReceitasService],
})
export class ReceitasModule {}
