import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1688517803034 implements MigrationInterface {
    name = 'undefinedigration1688517803034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "sdId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "sdIdCheckIn" character varying`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "sdIdCheckOut" character varying`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "feopsIdCheckIn" character varying`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "feopsIdCheckOut" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "feopsIdCheckOut"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "feopsIdCheckIn"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "sdIdCheckOut"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "sdIdCheckIn"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "sdId" character varying`);
    }

}
