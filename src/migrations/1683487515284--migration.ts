import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1683487515284 implements MigrationInterface {
    name = 'undefinedigration1683487515284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "onboardedBy"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "onboardedBy" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_1e141aeaf8d6fabca9c1c823936" UNIQUE ("onboardedBy")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1e141aeaf8d6fabca9c1c823936" FOREIGN KEY ("onboardedBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1e141aeaf8d6fabca9c1c823936"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_1e141aeaf8d6fabca9c1c823936"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "onboardedBy"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "onboardedBy" character varying(50)`);
    }

}
