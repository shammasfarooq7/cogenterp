import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1688749574412 implements MigrationInterface {
    name = 'undefinedigration1688749574412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "siteTiming"`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "siteTiming" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "siteTiming"`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "siteTiming" TIME NOT NULL`);
    }

}
