import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1687689722161 implements MigrationInterface {
    name = 'undefinedigration1687689722161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "provinceState"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "siteAddress"`);
        await queryRunner.query(`ALTER TABLE "ticket_details" DROP COLUMN "postCode"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "postCode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "siteAddress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "provinceState" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_details" ADD "country" character varying NOT NULL`);
    }

}
