import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1688750674974 implements MigrationInterface {
    name = 'undefinedigration1688750674974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "projectNumber" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ALTER COLUMN "projectNumber" SET NOT NULL`);
    }

}
