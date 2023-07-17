import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1687124268720 implements MigrationInterface {
    name = 'undefinedigration1687124268720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "province" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "postcode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "siteAddress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "pocName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "pocContactNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "pocEmailAdrress" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "ppe1h" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "ppe2h" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "ppe3h" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "ppe4h" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "ppe5h" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "ppe6h" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "ppe7h" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "ppe8h" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "tandm30" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "tandm1h" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "afth" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "wknd" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "ph" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "sat" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "sun" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "siteTiming" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "timeZone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "dispatchAgreed" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobsites_incrementtime_enum" AS ENUM('15', '30', '60', '120')`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "incrementTime" "public"."jobsites_incrementtime_enum" NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobsites_servicetype_enum" AS ENUM('BREAKFIX', 'IMAC', 'CABLING', 'H&F', 'TRAINING', 'DSS')`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "serviceType" "public"."jobsites_servicetype_enum" array NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobsites_supporttype_enum" AS ENUM('FTE-WBF', 'FTE-NBF', 'FSE', 'PTE-WBF', 'PTE-NBF')`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "supportType" "public"."jobsites_supporttype_enum" array NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobsites_servicecatitem_enum" AS ENUM('BREAKFIX', 'IMAC', 'CABLING', 'H&F', 'TRAINING', 'DSS')`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "serviceCatItem" "public"."jobsites_servicecatitem_enum" array NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobsites_agreedsla_enum" AS ENUM('SBD4H', 'SBD2H', 'SBD', 'NBD', '2BD', '3BD', '5BD', '10BD')`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "agreedSla" "public"."jobsites_agreedsla_enum" array NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobsites_coverage_enum" AS ENUM('5D9H', '24X7AFTH', '24X7WKND', '24X7HLDY')`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "coverage" "public"."jobsites_coverage_enum" array NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobsites_technologytype_enum" AS ENUM('EUC', 'NETWORK', 'LINUX', 'MAC')`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "technologyType" "public"."jobsites_technologytype_enum" array NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."jobsites_currency_enum" AS ENUM('USD', 'EUR', 'GBP')`);
        await queryRunner.query(`ALTER TABLE "jobsites" ADD "currency" "public"."jobsites_currency_enum" array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "currency"`);
        await queryRunner.query(`DROP TYPE "public"."jobsites_currency_enum"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "technologyType"`);
        await queryRunner.query(`DROP TYPE "public"."jobsites_technologytype_enum"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "coverage"`);
        await queryRunner.query(`DROP TYPE "public"."jobsites_coverage_enum"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "agreedSla"`);
        await queryRunner.query(`DROP TYPE "public"."jobsites_agreedsla_enum"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "serviceCatItem"`);
        await queryRunner.query(`DROP TYPE "public"."jobsites_servicecatitem_enum"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "supportType"`);
        await queryRunner.query(`DROP TYPE "public"."jobsites_supporttype_enum"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "serviceType"`);
        await queryRunner.query(`DROP TYPE "public"."jobsites_servicetype_enum"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "incrementTime"`);
        await queryRunner.query(`DROP TYPE "public"."jobsites_incrementtime_enum"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "dispatchAgreed"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "timeZone"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "siteTiming"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "sun"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "sat"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "ph"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "wknd"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "afth"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "tandm1h"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "tandm30"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "ppe8h"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "ppe7h"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "ppe6h"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "ppe5h"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "ppe4h"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "ppe3h"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "ppe2h"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "ppe1h"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "pocEmailAdrress"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "pocContactNumber"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "pocName"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "siteAddress"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "postcode"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "province"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "jobsites" DROP COLUMN "name"`);
    }

}
