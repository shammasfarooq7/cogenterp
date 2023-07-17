import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686688801236 implements MigrationInterface {
    name = 'undefinedigration1686688801236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_attachments" ADD CONSTRAINT "FK_446d496b9535812bc495a505f39" FOREIGN KEY ("ticketDetailsId") REFERENCES "ticket_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_attachments" DROP CONSTRAINT "FK_446d496b9535812bc495a505f39"`);
    }

}
