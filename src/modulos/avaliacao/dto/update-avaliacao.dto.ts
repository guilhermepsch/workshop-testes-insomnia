import { IsNotEmpty } from 'class-validator';

export class UpdateAvaliacaoDto {
  @IsNotEmpty({ message: 'O comentário não pode ser vazio' })
  comentario: string;
  @IsNotEmpty({ message: 'A nota não pode ser vazia' })
  nota: number;
}
