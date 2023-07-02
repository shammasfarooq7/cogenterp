import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686687806686 implements MigrationInterface {
    name = 'undefinedigration1686687806686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket_dates" ("id" SERIAL NOT NULL, "date" date NOT NULL, "scheduledTime" TIME WITH TIME ZONE NOT NULL, "ticketId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3dad1c4c7eb2b0c6bc9ad17c1f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket_dates" ADD CONSTRAINT "FK_c50893517c5aa659d12cb00f959" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_dates" DROP CONSTRAINT "FK_c50893517c5aa659d12cb00f959"`);
        await queryRunner.query(`DROP TABLE "ticket_dates"`);
    }

}
