import { Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritoEntity } from './favorito.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ReceitaEntity } from '../receitas/receita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritoEntity, UsuarioEntity, ReceitaEntity]),
  ],
  controllers: [FavoritosController],
  providers: [FavoritosService],
  exports: [FavoritosService],
})
export class FavoritosModule {}
