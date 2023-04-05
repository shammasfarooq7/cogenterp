import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1680645845454 implements MigrationInterface {
    name = 'undefinedigration1680645845454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."roles_role_enum" AS ENUM('rms', 'sd', 'resource', 'feops', 'admin')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."roles_role_enum" NOT NULL DEFAULT 'resource', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_role_enum"`);
    }

}
