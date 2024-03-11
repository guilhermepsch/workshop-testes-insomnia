import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ReceitaEntity } from '../receitas/receita.entity';

@Entity({ name: 'favoritos' })
export class FavoritoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.avaliacoes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  usuario: UsuarioEntity;

  @ManyToOne(() => ReceitaEntity, (receita) => receita.avaliacoes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  receita: ReceitaEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
