import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686688610456 implements MigrationInterface {
    name = 'undefinedigration1686688610456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "resourceId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "resourceId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "FK_fc7c5fb11d1ef2c578aac8d65e2" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "FK_fc7c5fb11d1ef2c578aac8d65e2"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "resourceId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "resourceId" character varying NOT NULL`);
    }

}
