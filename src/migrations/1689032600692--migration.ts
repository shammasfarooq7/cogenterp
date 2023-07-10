import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1689032600692 implements MigrationInterface {
    name = 'undefinedigration1689032600692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_dates" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "ticket_dates" DROP COLUMN "deletedAt"`);
    }

}
