import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1683099081612 implements MigrationInterface {
    name = 'undefinedigration1683099081612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_idcardtype_enum" AS ENUM('dl', 'pp', 'id', 'rp')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "idCardType" "public"."users_idcardtype_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "whatsappGroup" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "whatsappGroupLink" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "workPermitStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "contractDocuments" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "availability" character varying`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" DROP CONSTRAINT "FK_de52ee40aabfbe3eef30992bf65"`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "userId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_payment_methods_userId_seq"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ALTER COLUMN "usersId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_roles_usersId_seq"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ALTER COLUMN "rolesId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "user_roles_rolesId_seq"`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ADD CONSTRAINT "FK_de52ee40aabfbe3eef30992bf65" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" DROP CONSTRAINT "FK_de52ee40aabfbe3eef30992bf65"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_roles_rolesId_seq" OWNED BY "user_roles"."rolesId"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ALTER COLUMN "rolesId" SET DEFAULT nextval('"user_roles_rolesId_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_roles_usersId_seq" OWNED BY "user_roles"."usersId"`);
        await queryRunner.query(`ALTER TABLE "user_roles" ALTER COLUMN "usersId" SET DEFAULT nextval('"user_roles_usersId_seq"')`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "user_payment_methods_userId_seq" OWNED BY "user_payment_methods"."userId"`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "userId" SET DEFAULT nextval('"user_payment_methods_userId_seq"')`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ADD CONSTRAINT "FK_de52ee40aabfbe3eef30992bf65" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "availability"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contractDocuments"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "workPermitStatus"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "whatsappGroupLink"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "whatsappGroup"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "idCardType"`);
        await queryRunner.query(`DROP TYPE "public"."users_idcardtype_enum"`);
    }

}
