import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1683332411131 implements MigrationInterface {
    name = 'undefinedigration1683332411131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_interviewstatus_enum" AS ENUM('Complete', 'Scheduled', 'NotScheduled')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "interviewStatus" "public"."users_interviewstatus_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "interviewStatus"`);
        await queryRunner.query(`DROP TYPE "public"."users_interviewstatus_enum"`);
    }

}
