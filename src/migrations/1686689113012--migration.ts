import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686689113012 implements MigrationInterface {
    name = 'undefinedigration1686689113012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "projectId" integer`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD CONSTRAINT "FK_f13b2ec0626202073da2ca664fa" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobsites" DROP CONSTRAINT "FK_f13b2ec0626202073da2ca664fa"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "projectId" character varying`);
    }

}
