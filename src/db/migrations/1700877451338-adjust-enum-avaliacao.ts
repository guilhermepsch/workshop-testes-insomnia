import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustEnumAvaliacao1700877451338 implements MigrationInterface {
    name = 'AdjustEnumAvaliacao1700877451338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."avaliacoes_nota_enum" RENAME TO "avaliacoes_nota_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."avaliacoes_nota_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ALTER COLUMN "nota" TYPE "public"."avaliacoes_nota_enum" USING "nota"::"text"::"public"."avaliacoes_nota_enum"`);
        await queryRunner.query(`DROP TYPE "public"."avaliacoes_nota_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."avaliacoes_nota_enum_old" AS ENUM('1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" ALTER COLUMN "nota" TYPE "public"."avaliacoes_nota_enum_old" USING "nota"::"text"::"public"."avaliacoes_nota_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."avaliacoes_nota_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."avaliacoes_nota_enum_old" RENAME TO "avaliacoes_nota_enum"`);
    }

}
