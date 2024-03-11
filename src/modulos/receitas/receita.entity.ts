import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AvaliacaoEntity } from '../avaliacao/avaliacao.entity';

export enum ReceitaAtivo {
  INATIVO = 0,
  ATIVO = 1,
}

@Entity({ name: 'receitas' })
export class ReceitaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 255, nullable: false })
  nome: string;

  @Column({ name: 'ingredientes', length: 5000, nullable: false })
  ingredientes: string;

  @Column({ name: 'modo_preparo', length: 5000, nullable: false })
  modoPreparo: string;

  @Column({ name: 'imagem', length: 500000, nullable: true })
  imagem: string;

  @Column({ name: 'tags', type: 'simple-array', nullable: false })
  tags: string[];

  @Column({ name: 'descricao', length: 5000, nullable: true })
  descricao: string;

  @Column({
    name: 'ativo',
    type: 'enum',
    enum: ReceitaAtivo,
    nullable: false,
    default: ReceitaAtivo.ATIVO,
  })
  ativo: ReceitaAtivo;

  @Column({ name: 'visualizacoes', nullable: false, default: 0 })
  visualizacoes: number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.avaliacoes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  usuario: UsuarioEntity;

  @OneToMany(() => AvaliacaoEntity, (avaliacao) => avaliacao.receita)
  avaliacoes: AvaliacaoEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
