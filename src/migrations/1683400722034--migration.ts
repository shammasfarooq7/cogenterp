import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1683400722034 implements MigrationInterface {
    name = 'undefinedigration1683400722034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_idcardtype_enum" RENAME TO "users_idcardtype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_idcardtype_enum" AS ENUM('DriverLicense', 'Passport', 'IdCard', 'ResidencePermit')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "idCardType" TYPE "public"."users_idcardtype_enum" USING "idCardType"::"text"::"public"."users_idcardtype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_idcardtype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_idcardtype_enum_old" AS ENUM('dl', 'pp', 'id', 'rp')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "idCardType" TYPE "public"."users_idcardtype_enum_old" USING "idCardType"::"text"::"public"."users_idcardtype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_idcardtype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_idcardtype_enum_old" RENAME TO "users_idcardtype_enum"`);
    }

}
