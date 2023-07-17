import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686688769757 implements MigrationInterface {
    name = 'undefinedigration1686688769757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket_attachments" ("id" SERIAL NOT NULL, "url" character varying, "ticketDetailsId" integer NOT NULL, CONSTRAINT "PK_7e5011f87f95e78fe4bd7d982a3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ticket_attachments"`);
    }

}
