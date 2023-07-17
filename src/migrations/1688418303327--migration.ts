import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1688418303327 implements MigrationInterface {
    name = 'undefinedigration1688418303327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "projectCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "siteName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "province" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "postCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "siteAddress" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_status_enum" AS ENUM('open', 'in-progess', 'cancelled', 'scheduled', 'cancelled but chargeable', 'on-route', 'onsite', 'work started', 'offsite', 'completed', 'rescheduled')`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "status" "public"."tickets_status_enum" NOT NULL DEFAULT 'open'`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "isApproved" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "isApproved"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_status_enum"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "siteAddress"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "postCode"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "province"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "siteName"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "projectCode"`);
    }

}
