import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1680645605518 implements MigrationInterface {
    name = 'undefinedigration1680645605518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('Direct', 'Indirect')`);
        await queryRunner.query(`CREATE TYPE "public"."users_engagementtype_enum" AS ENUM('Fse', 'Fte', 'Pte', 'Remote')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "phoneNumber" character varying, "status" "public"."users_status_enum" NOT NULL DEFAULT 'Direct', "vendorName" character varying, "engagementType" "public"."users_engagementtype_enum" NOT NULL DEFAULT 'Fse', "rpocName" character varying, "rpocEmail" character varying(50), "rpocContactNumber" character varying, "firstName" character varying, "lastName" character varying, "middleName" character varying, "idCardNumber" character varying, "taxNumber" character varying, "languages" text array, "skillSet" text array, "availableTools" text array, "nationality" character varying, "region" character varying, "country" character varying, "state" character varying, "city" character varying, "postalCode" character varying, "addressLine1" character varying, "addressLine2" character varying, "whatsappNumber" character varying, "cogentEmail" character varying(50), "descriptionColor" character varying, "hourlyRate" character varying, "halfDayRate" character varying, "fullDayRate" character varying, "monthlyRate" character varying, "anyExtraRate" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_engagementtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    }

}
