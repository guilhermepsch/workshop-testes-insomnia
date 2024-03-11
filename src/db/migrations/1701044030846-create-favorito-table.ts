import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFavoritoTable1701044030846 implements MigrationInterface {
    name = 'CreateFavoritoTable1701044030846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favoritos" ADD "receitaId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favoritos" ADD CONSTRAINT "FK_d4ece1f6419cda4088936ec63c4" FOREIGN KEY ("receitaId") REFERENCES "receitas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favoritos" DROP CONSTRAINT "FK_d4ece1f6419cda4088936ec63c4"`);
        await queryRunner.query(`ALTER TABLE "favoritos" DROP COLUMN "receitaId"`);
    }

}
