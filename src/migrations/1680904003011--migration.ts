import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1680904003011 implements MigrationInterface {
    name = 'undefinedigration1680904003011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "transport" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "mobility" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "onboardedBy" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isOnboarded" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isOnboarded"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "onboardedBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobility"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "transport"`);
    }

}
