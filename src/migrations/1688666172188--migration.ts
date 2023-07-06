import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1688666172188 implements MigrationInterface {
    name = 'undefinedigration1688666172188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "projectId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "jobSiteId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "jobSiteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "projectId" SET NOT NULL`);
    }

}
