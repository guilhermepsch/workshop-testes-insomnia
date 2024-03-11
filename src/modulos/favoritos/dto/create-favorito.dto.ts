import { IsUUID } from 'class-validator';

export class CreateFavoritoDto {
  @IsUUID()
  receitaId: string;
}
