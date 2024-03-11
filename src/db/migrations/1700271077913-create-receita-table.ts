import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReceitaTable1700271077913 implements MigrationInterface {
  name = 'CreateReceitaTable1700271077913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."receitas_ativo_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "receitas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(255) NOT NULL, "ingredientes" character varying(5000) NOT NULL, "modo_preparo" character varying(5000) NOT NULL, "imagem" character varying(5000), "tags" text NOT NULL, "ativo" "public"."receitas_ativo_enum" NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "usuarioId" uuid, CONSTRAINT "PK_8312a0fa7e81b3c0643ccac8b36" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "avaliacoes" ADD "receitaId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "receitas" ADD CONSTRAINT "FK_1e43dad47d4bd92da39f75946d8" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_adb894d31f79162464f66689601" FOREIGN KEY ("receitaId") REFERENCES "receitas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_adb894d31f79162464f66689601"`,
    );
    await queryRunner.query(
      `ALTER TABLE "receitas" DROP CONSTRAINT "FK_1e43dad47d4bd92da39f75946d8"`,
    );
    await queryRunner.query(`ALTER TABLE "avaliacoes" DROP COLUMN "receitaId"`);
    await queryRunner.query(`DROP TABLE "receitas"`);
    await queryRunner.query(`DROP TYPE "public"."receitas_ativo_enum"`);
  }
}
