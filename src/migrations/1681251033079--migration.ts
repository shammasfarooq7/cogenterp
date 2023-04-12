import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1681251033079 implements MigrationInterface {
    name = 'undefinedigration1681251033079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isARequest" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "onboardedAt" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "onboardedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isARequest"`);
    }

}
