import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686688411262 implements MigrationInterface {
    name = 'undefinedigration1686688411262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "ticketDateId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "ticketDateId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "FK_863605c732ba0a6c6aa4586c55a" FOREIGN KEY ("ticketDateId") REFERENCES "ticket_dates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "FK_863605c732ba0a6c6aa4586c55a"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "ticketDateId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "ticketDateId" character varying NOT NULL`);
    }

}
