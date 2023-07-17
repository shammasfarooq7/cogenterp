import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1687290845315 implements MigrationInterface {
    name = 'undefinedigration1687290845315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "checkIn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "checkOut" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "sdId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "sdCheckIn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "sdCheckOut" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "feopsCheckIn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "feopsCheckOut" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "feopsCheckOut" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "feopsCheckIn" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "sdCheckOut" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "sdCheckIn" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "sdId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "checkOut" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ALTER COLUMN "checkIn" SET NOT NULL`);
    }

}
