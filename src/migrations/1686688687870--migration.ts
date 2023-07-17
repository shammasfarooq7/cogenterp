import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686688687870 implements MigrationInterface {
    name = 'undefinedigration1686688687870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ticket_details_technologytype_enum" AS ENUM('EUC', 'NETWORK', 'OTHER')`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_details_region_enum" AS ENUM('EMEA', 'APAC', 'AMER', 'LATAM')`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_details_servicelevel_enum" AS ENUM('L0', 'L1', 'L2', 'L3', 'L4')`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_details_servicepriority_enum" AS ENUM('P1', 'P2', 'P3', 'P4', 'P5')`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_details_slapriority_enum" AS ENUM('3BD', 'NBD', 'SBD', 'SBDH4', '24x7')`);
        await queryRunner.query(`CREATE TABLE "ticket_details" ("id" SERIAL NOT NULL, "accountName" character varying NOT NULL, "endClientName" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "provinceState" character varying NOT NULL, "siteAddress" character varying NOT NULL, "postCode" character varying NOT NULL, "spocName" character varying NOT NULL, "spocContactNumber" character varying NOT NULL, "spocEmailAddress" character varying NOT NULL, "siteAccessInstruction" character varying NOT NULL, "customerCaseNumber" character varying NOT NULL, "jobSummary" character varying NOT NULL, "caseDetails" character varying NOT NULL, "scopeOfWork" character varying NOT NULL, "instructions" character varying NOT NULL, "addInstruction" character varying NOT NULL, "specialInstruction" character varying NOT NULL, "hardwareSN" character varying NOT NULL, "toolsRequested" text array, "technologyType" "public"."ticket_details_technologytype_enum", "region" "public"."ticket_details_region_enum", "serviceType" text array, "serviceLevel" "public"."ticket_details_servicelevel_enum" NOT NULL, "servicePriority" "public"."ticket_details_servicepriority_enum" NOT NULL, "slaPriority" "public"."ticket_details_slapriority_enum" NOT NULL, "serviceDocUrl" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_883aec56d7ab545277e892bd6c5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ticket_details"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_details_slapriority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_details_servicepriority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_details_servicelevel_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_details_region_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_details_technologytype_enum"`);
    }

}
