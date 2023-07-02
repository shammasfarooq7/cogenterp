import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686689054468 implements MigrationInterface {
    name = 'undefinedigration1686689054468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobsites" ("id" SERIAL NOT NULL, "projectId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_d5a7099ad51dfec1d2f1872ec22" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "jobsites"`);
    }

}
