import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';
import { FavoritoEntity } from './favorito.entity';
import { ReceitaEntity } from '../receitas/receita.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(FavoritoEntity)
    private favoritoRepository: Repository<FavoritoEntity>,
    @InjectRepository(ReceitaEntity)
    private receitaRepository: Repository<ReceitaEntity>,
  ) {}

  async create(createFavoritoDto: CreateFavoritoDto, usuarioId: string) {
    const favoritoEntity = new FavoritoEntity();

    favoritoEntity.usuario = await this.buscaUsuario(usuarioId);
    favoritoEntity.receita = await this.buscaReceita(
      createFavoritoDto.receitaId,
    );

    if (
      await this.favoritoRepository.findOneBy({
        usuario: { id: usuarioId },
        receita: { id: createFavoritoDto.receitaId },
      })
    ) {
      throw new NotFoundException('A receita já está nos favoritos');
    }

    return this.favoritoRepository.save(favoritoEntity);
  }

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    return usuario;
  }

  private async buscaReceita(id: string) {
    const receita = await this.receitaRepository.findOneBy({ id });

    if (receita === null) {
      throw new NotFoundException('A receita não foi encontrada');
    }

    return receita;
  }

  findAll(id: string) {
    return this.favoritoRepository.find({
      where: { usuario: { id } },
      relations: ['receita'],
    });
  }
}
