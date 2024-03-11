import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAvaliacaoTable1699841177543 implements MigrationInterface {
  name = 'CreateAvaliacaoTable1699841177543';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."avaliacoes_nota_enum" AS ENUM('1', '2', '3', '4', '5')`,
    );
    await queryRunner.query(
      `CREATE TABLE "avaliacoes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nota" "public"."avaliacoes_nota_enum" NOT NULL, "comentario" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "usuarioId" uuid, CONSTRAINT "PK_84647fe39434d93a8b0ced69d7a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_c4c22c7915127ffdaa19397ceb2" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_c4c22c7915127ffdaa19397ceb2"`,
    );
    await queryRunner.query(`DROP TABLE "avaliacoes"`);
    await queryRunner.query(`DROP TYPE "public"."avaliacoes_nota_enum"`);
  }
}
