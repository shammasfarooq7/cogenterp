import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1683371739089 implements MigrationInterface {
    name = 'undefinedigration1683371739089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "loginTracker" ("id" SERIAL NOT NULL, "lastLogin" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_632697fb1638b5608cf16797fe8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "requestApproved" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "loginTrackerId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_37c274a69a761e87c799fe4e7e1" UNIQUE ("loginTrackerId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_37c274a69a761e87c799fe4e7e1" FOREIGN KEY ("loginTrackerId") REFERENCES "loginTracker"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_37c274a69a761e87c799fe4e7e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_37c274a69a761e87c799fe4e7e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loginTrackerId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "requestApproved"`);
        await queryRunner.query(`DROP TABLE "loginTracker"`);
    }

}
