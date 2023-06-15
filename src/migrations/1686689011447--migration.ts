import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686689011447 implements MigrationInterface {
    name = 'undefinedigration1686689011447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_1699d6164673cbc856b9107b847" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_1699d6164673cbc856b9107b847"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "customerId" character varying`);
    }

}
