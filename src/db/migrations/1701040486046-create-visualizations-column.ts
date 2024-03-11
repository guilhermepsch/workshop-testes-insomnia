import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVisualizationsColumn1701040486046 implements MigrationInterface {
    name = 'CreateVisualizationsColumn1701040486046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receitas" ADD "visualizacoes" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receitas" DROP COLUMN "visualizacoes"`);
    }

}
