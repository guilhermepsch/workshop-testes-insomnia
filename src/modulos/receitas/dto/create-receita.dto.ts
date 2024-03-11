import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateReceitaDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'Os ingredientes não podem ser vazios' })
  @IsString({ message: 'Os ingredientes devem ser uma string' })
  ingredientes: string;

  @IsNotEmpty({ message: 'O modo de preparo não pode ser vazio' })
  @IsString({ message: 'O modo de preparo deve ser uma string' })
  modoPreparo: string;

  @IsUrl({}, { message: 'A imagem deve ser uma URL' })
  @IsNotEmpty({ message: 'A imagem não pode ser vazia' })
  imagem: string;

  @IsNotEmpty({ message: 'As tags não podem ser vazias' })
  @IsArray({ message: 'As tags devem ser um array' })
  tags: string[];

  @IsString({ message: 'A descrição deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  descricao: string;
}
