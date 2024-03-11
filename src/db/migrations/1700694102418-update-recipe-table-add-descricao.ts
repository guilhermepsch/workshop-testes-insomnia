import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRecipeTableAddDescricao1700694102418 implements MigrationInterface {
    name = 'UpdateRecipeTableAddDescricao1700694102418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receitas" DROP CONSTRAINT "FK_1e43dad47d4bd92da39f75946d8"`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_c4c22c7915127ffdaa19397ceb2"`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_adb894d31f79162464f66689601"`);
        await queryRunner.query(`ALTER TABLE "receitas" ADD "descricao" character varying(5000)`);
        await queryRunner.query(`ALTER TABLE "receitas" ALTER COLUMN "usuarioId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ALTER COLUMN "usuarioId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ALTER COLUMN "receitaId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "receitas" ADD CONSTRAINT "FK_1e43dad47d4bd92da39f75946d8" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_c4c22c7915127ffdaa19397ceb2" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_adb894d31f79162464f66689601" FOREIGN KEY ("receitaId") REFERENCES "receitas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_adb894d31f79162464f66689601"`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_c4c22c7915127ffdaa19397ceb2"`);
        await queryRunner.query(`ALTER TABLE "receitas" DROP CONSTRAINT "FK_1e43dad47d4bd92da39f75946d8"`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ALTER COLUMN "receitaId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ALTER COLUMN "usuarioId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "receitas" ALTER COLUMN "usuarioId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "receitas" DROP COLUMN "descricao"`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_adb894d31f79162464f66689601" FOREIGN KEY ("receitaId") REFERENCES "receitas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_c4c22c7915127ffdaa19397ceb2" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receitas" ADD CONSTRAINT "FK_1e43dad47d4bd92da39f75946d8" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
