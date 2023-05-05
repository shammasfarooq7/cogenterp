import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1683322315912 implements MigrationInterface {
    name = 'undefinedigration1683322315912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "engagementType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "beneficiaryMiddleName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "beneficiaryAddress" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "branchName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "bankAddress" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "bankAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "branchName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "beneficiaryAddress" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ALTER COLUMN "beneficiaryMiddleName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "engagementType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET NOT NULL`);
    }

}
