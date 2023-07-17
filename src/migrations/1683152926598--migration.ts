import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1683152926598 implements MigrationInterface {
    name = 'undefinedigration1683152926598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "resumeDocUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "identityDocUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "identityDocUrl"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resumeDocUrl"`);
    }

}
