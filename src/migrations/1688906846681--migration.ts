import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1688906846681 implements MigrationInterface {
    name = 'undefinedigration1688906846681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_dates" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "ticket_dates" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_dates" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "ticket_dates" ADD "date" date NOT NULL`);
    }

}
