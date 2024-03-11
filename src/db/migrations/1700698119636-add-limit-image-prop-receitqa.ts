import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLimitImagePropReceitqa1700698119636
  implements MigrationInterface
{
  name = 'AddLimitImagePropReceitqa1700698119636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "receitas" DROP COLUMN "imagem"`);
    await queryRunner.query(
      `ALTER TABLE "receitas" ADD "imagem" character varying(500000)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "receitas" DROP COLUMN "imagem"`);
    await queryRunner.query(
      `ALTER TABLE "receitas" ADD "imagem" character varying(5000)`,
    );
  }
}
