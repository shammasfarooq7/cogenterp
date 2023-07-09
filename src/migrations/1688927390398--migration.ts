import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1688927390398 implements MigrationInterface {
    name = 'undefinedigration1688927390398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobsites" ALTER COLUMN "siteTiming" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobsites" ALTER COLUMN "siteTiming" SET NOT NULL`);
    }

}
