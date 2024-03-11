import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReceitaEntity } from '../receitas/receita.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AvaliacaoEntity } from './avaliacao.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(AvaliacaoEntity)
    private readonly avaliacaoRepository: Repository<AvaliacaoEntity>,
    @InjectRepository(ReceitaEntity)
    private readonly receitaRepository: Repository<ReceitaEntity>,
  ) {}

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    return usuario;
  }

  private async buscaReceita(id: string) {
    const receita = await this.receitaRepository.findOne({
      where: { id },
      relations: ['usuario', 'avaliacoes'],
    });

    if (receita === null) {
      throw new NotFoundException('A receita não foi encontrada');
    }

    return receita;
  }

  async create(usuarioId: string, createAvaliacaoDto: CreateAvaliacaoDto) {
    const avaliacaoEntity = new AvaliacaoEntity();
    const usuario = await this.buscaUsuario(usuarioId);
    const receita = await this.buscaReceita(createAvaliacaoDto.receitaId);

    if (receita.usuario.id === usuario.id) {
      throw new NotFoundException(
        'O usuário não pode avaliar sua própria receita',
      );
    }
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: {
        usuario: {
          id: usuarioId,
        },
        receita: {
          id: createAvaliacaoDto.receitaId,
        },
      },
    });
    if (avaliacao) {
      throw new NotFoundException('O usuário já avaliou esta receita');
    }

    avaliacaoEntity.nota = createAvaliacaoDto.nota;
    avaliacaoEntity.comentario = createAvaliacaoDto.comentario;
    avaliacaoEntity.usuario = usuario;
    avaliacaoEntity.receita = receita;

    return this.avaliacaoRepository.save(avaliacaoEntity);
  }

  async findAll() {
    return await this.avaliacaoRepository.find({ loadRelationIds: true });
  }

  async findOne(id: string) {
    return await this.avaliacaoRepository.findOneBy({ id });
  }

  async update(id: string, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    const avaliacao = await this.avaliacaoRepository.findOneBy({ id });
    if (!avaliacao) {
      throw new NotFoundException('A avaliação não foi encontrada');
    }
    avaliacao.comentario = updateAvaliacaoDto.comentario;
    avaliacao.nota = updateAvaliacaoDto.nota;
  }

  async remove(id: string) {
    const avaliacao = await this.avaliacaoRepository.findOneBy({ id });
    if (!avaliacao) {
      throw new NotFoundException('A avaliação não foi encontrada');
    }
    return await this.avaliacaoRepository.remove(avaliacao);
  }
}
