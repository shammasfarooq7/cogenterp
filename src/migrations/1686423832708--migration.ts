import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686423832708 implements MigrationInterface {
    name = 'undefinedigration1686423832708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."resources_status_enum" AS ENUM('Direct', 'Indirect')`);
        await queryRunner.query(`CREATE TYPE "public"."resources_idcardtype_enum" AS ENUM('DriverLicense', 'Passport', 'IdCard', 'ResidencePermit')`);
        await queryRunner.query(`CREATE TYPE "public"."resources_interviewstatus_enum" AS ENUM('Complete', 'Scheduled', 'NotScheduled')`);
        await queryRunner.query(`CREATE TYPE "public"."resources_engagementtype_enum" AS ENUM('Fse', 'Fte', 'Pte', 'Remote')`);
        await queryRunner.query(`CREATE TABLE "resources" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "mobileNumber" character varying, "contactNumber" character varying, "status" "public"."resources_status_enum" DEFAULT 'Direct', "idCardType" "public"."resources_idcardtype_enum", "interviewStatus" "public"."resources_interviewstatus_enum", "vendorName" character varying, "whatsappGroup" character varying, "whatsappGroupLink" character varying, "workPermitStatus" character varying, "contractDocuments" boolean, "availability" character varying, "engagementType" "public"."resources_engagementtype_enum" DEFAULT 'Fse', "rpocName" character varying, "rpocEmail" character varying(50), "rpocContactNumber" character varying, "firstName" character varying, "lastName" character varying, "middleName" character varying, "idCardNumber" character varying, "taxNumber" character varying, "languages" text array, "skillSet" text array, "availableTools" text array, "nationality" character varying, "region" character varying, "country" character varying, "state" character varying, "city" character varying, "postalCode" character varying, "addressLine1" text, "addressLine2" text, "whatsappNumber" character varying, "cogentEmail" character varying(50), "descriptionColor" character varying, "hourlyRate" character varying, "halfDayRate" character varying, "fullDayRate" character varying, "monthlyRate" character varying, "anyExtraRate" character varying, "transport" character varying, "mobility" character varying, "resumeDocUrl" character varying, "identityDocUrl" character varying, "isOnboarded" boolean NOT NULL DEFAULT false, "isARequest" boolean NOT NULL DEFAULT false, "requestApproved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "onboardedAt" TIMESTAMP WITH TIME ZONE, "userId" integer, "onboardedBy" integer, CONSTRAINT "UQ_2dedf2408ae6ae39407e670e45c" UNIQUE ("email"), CONSTRAINT "REL_50a0b3ca64c877ed82ceb87183" UNIQUE ("userId"), CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ADD "resourceId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "resourceId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fd1fdd3795aedec6ddd0ad32466" UNIQUE ("resourceId")`);
        await queryRunner.query(`ALTER TABLE "resources" ADD CONSTRAINT "FK_50a0b3ca64c877ed82ceb871830" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resources" ADD CONSTRAINT "FK_b6fd9d6212eddac8b5b6e311b5d" FOREIGN KEY ("onboardedBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ADD CONSTRAINT "FK_d622b9d8d559d88f09f2f69a86e" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fd1fdd3795aedec6ddd0ad32466" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fd1fdd3795aedec6ddd0ad32466"`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" DROP CONSTRAINT "FK_d622b9d8d559d88f09f2f69a86e"`);
        await queryRunner.query(`ALTER TABLE "resources" DROP CONSTRAINT "FK_b6fd9d6212eddac8b5b6e311b5d"`);
        await queryRunner.query(`ALTER TABLE "resources" DROP CONSTRAINT "FK_50a0b3ca64c877ed82ceb871830"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fd1fdd3795aedec6ddd0ad32466"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resourceId"`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" DROP COLUMN "resourceId"`);
        await queryRunner.query(`DROP TABLE "resources"`);
        await queryRunner.query(`DROP TYPE "public"."resources_engagementtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resources_interviewstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resources_idcardtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resources_status_enum"`);
    }

}
