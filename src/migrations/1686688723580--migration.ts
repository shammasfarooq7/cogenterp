import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686688723580 implements MigrationInterface {
    name = 'undefinedigration1686688723580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "ticketDetailId"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "ticketDetailId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_01769e25ee8fb209ea931194a0d" FOREIGN KEY ("ticketDetailId") REFERENCES "ticket_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_01769e25ee8fb209ea931194a0d"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "ticketDetailId"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "ticketDetailId" character varying NOT NULL`);
    }

}
