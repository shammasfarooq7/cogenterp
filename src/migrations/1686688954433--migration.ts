import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686688954433 implements MigrationInterface {
    name = 'undefinedigration1686688954433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "vendorReference" character varying NOT NULL, "website" character varying NOT NULL, "establishYear" character varying NOT NULL, "employeesCount" character varying NOT NULL, "dispatchGroupEmail" character varying NOT NULL, "city" character varying NOT NULL, "employeeCountLinkedin" character varying NOT NULL, "phone" character varying NOT NULL, "country" character varying NOT NULL, "postCode" character varying NOT NULL, "linkedinUrl" character varying NOT NULL, "email" character varying NOT NULL, "stateProvince" character varying NOT NULL, "address" character varying NOT NULL, "annualRevenue" character varying NOT NULL, "revenueSoftware" character varying NOT NULL, "revenueConsultancy" character varying NOT NULL, "revenueSupport" character varying NOT NULL, "revenueLogistics" character varying NOT NULL, "revenueOther" character varying NOT NULL, "contactNumber" character varying NOT NULL, "addressLine1" character varying NOT NULL, "addressLine2" character varying NOT NULL, "emailId" character varying NOT NULL, "mobile" character varying NOT NULL, "whatsappNumber" character varying NOT NULL, "whatsappGroup" character varying NOT NULL, "whatsappLink" character varying NOT NULL, "cogentEmailId" character varying NOT NULL, "workPermitStatus" character varying NOT NULL, "primaryTechService" character varying NOT NULL, "fieldService" character varying NOT NULL, "keyCustomerSupport" character varying NOT NULL, "languageSupport" character varying NOT NULL, "countrySupported" character varying NOT NULL, "certification" character varying NOT NULL, "onboardedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "onboardedBy" integer, "userId" integer, CONSTRAINT "REL_b8512aa9cef03d90ed5744c94d" UNIQUE ("userId"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_053a6086bf225efeefa5bd9c926" FOREIGN KEY ("onboardedBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_b8512aa9cef03d90ed5744c94d7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_b8512aa9cef03d90ed5744c94d7"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_053a6086bf225efeefa5bd9c926"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
