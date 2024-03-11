import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFavoritoTable1701043954250 implements MigrationInterface {
    name = 'CreateFavoritoTable1701043954250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favoritos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "usuarioId" uuid NOT NULL, CONSTRAINT "PK_2a6a4d0119130451dc0b644590a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favoritos" ADD CONSTRAINT "FK_8b1cf1079b204d9e85414db4be9" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favoritos" DROP CONSTRAINT "FK_8b1cf1079b204d9e85414db4be9"`);
        await queryRunner.query(`DROP TABLE "favoritos"`);
    }

}
