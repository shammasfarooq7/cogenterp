import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1683235178669 implements MigrationInterface {
    name = 'undefinedigration1683235178669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "mobileNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contactNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contractDocuments"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contractDocuments" boolean`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressLine1"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressLine1" text`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressLine2"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressLine2" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressLine2"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressLine2" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressLine1"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressLine1" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contractDocuments"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contractDocuments" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contactNumber"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobileNumber"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phoneNumber" character varying`);
    }

}
