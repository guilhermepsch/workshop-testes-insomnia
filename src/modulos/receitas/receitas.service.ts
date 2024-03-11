import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AvaliacaoEntity } from '../avaliacao/avaliacao.entity';
import { Repository } from 'typeorm';
import { ReceitaEntity } from './receita.entity';

@Injectable()
export class ReceitasService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(AvaliacaoEntity)
    private readonly avaliacaoRepository: Repository<AvaliacaoEntity>,
    @InjectRepository(ReceitaEntity)
    private readonly receitaRepository: Repository<ReceitaEntity>,
  ) {}

  async create(usuarioId: string, createReceitaDto: CreateReceitaDto) {
    const usuario = await this.buscaUsuario(usuarioId);
    const receita = new ReceitaEntity();

    receita.nome = createReceitaDto.nome;
    receita.ingredientes = createReceitaDto.ingredientes;
    receita.modoPreparo = createReceitaDto.modoPreparo;
    receita.tags = createReceitaDto.tags;
    receita.usuario = usuario;
    receita.imagem = createReceitaDto.imagem;
    receita.descricao = createReceitaDto.descricao;

    return this.receitaRepository.save(receita);
  }

  async findAll() {
    return await this.receitaRepository.find({
      loadRelationIds: true,
      order: { visualizacoes: 'DESC' },
    });
  }

  async findOne(id: string) {
    return await this.receitaRepository.findOne({
      where: { id },
      relations: ['avaliacoes', 'usuario', 'avaliacoes.usuario'],
    });
  }

  async update(id: string, updateReceitaDto: UpdateReceitaDto) {
    const receita = await this.receitaRepository.findOneBy({ id });
    if (!receita) {
      throw new NotFoundException('A receita não foi encontrada');
    }
    receita.nome = updateReceitaDto.nome;
    receita.ingredientes = updateReceitaDto.ingredientes;
    receita.modoPreparo = updateReceitaDto.modoPreparo;
    receita.tags = updateReceitaDto.tags;
    receita.imagem = updateReceitaDto.imagem;
    receita.descricao = updateReceitaDto.descricao;

    return this.receitaRepository.save(receita);
  }

  async remove(id: string) {
    return await this.receitaRepository.delete({ id });
  }

  private async buscaUsuario(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    return usuario;
  }

  async findByUser(id: string) {
    const usuario = await this.buscaUsuario(id);
    return await this.receitaRepository.find({
      where: { usuario: { id: usuario.id } },
    });
  }

  async findRandom() {
    const receitas = await this.receitaRepository.find({
      order: { createdAt: 'DESC' },
      take: 3,
    });
    return receitas;
  }

  async findByName(nome: string) {
    return await this.receitaRepository.find({
      where: { nome: nome },
      loadRelationIds: true,
    });
  }

  async visualized(id: string) {
    console.log('entrou: ');
    const receita = await this.receitaRepository.findOneBy({ id });
    if (!receita) {
      throw new NotFoundException('A receita não foi encontrada');
    }
    receita.visualizacoes = receita.visualizacoes + 1;
    return this.receitaRepository.save(receita);
  }
}
