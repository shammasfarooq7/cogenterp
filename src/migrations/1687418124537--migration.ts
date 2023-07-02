import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1687418124537 implements MigrationInterface {
    name = 'undefinedigration1687418124537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "customerAbbr" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "customerTicketNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "customerName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "projectId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "jobSiteId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "isAdhoc" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "customerId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_7a1f978a1c1a6b2b1133014b4b2" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_7a1f978a1c1a6b2b1133014b4b2"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "isAdhoc"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "jobSiteId"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "customerName"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "customerTicketNumber"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customerAbbr"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "code"`);
    }

}
