import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1680646512031 implements MigrationInterface {
    name = 'undefinedigration1680646512031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_payment_methods" ("id" SERIAL NOT NULL, "accountType" character varying NOT NULL, "accountTitle" character varying NOT NULL, "beneficiaryFirstName" character varying NOT NULL, "beneficiaryMiddleName" character varying NOT NULL, "beneficiaryLastName" character varying NOT NULL, "beneficiaryAddress" character varying NOT NULL, "sortCode" character varying, "accountNumber" character varying NOT NULL, "iban" character varying NOT NULL, "swiftCode" character varying NOT NULL, "bankName" character varying NOT NULL, "branchName" character varying NOT NULL, "bankAddress" character varying NOT NULL, "userId" SERIAL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3baaffbd29bfd03e2c9e9a1fd24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_payment_methods" ADD CONSTRAINT "FK_de52ee40aabfbe3eef30992bf65" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_payment_methods" DROP CONSTRAINT "FK_de52ee40aabfbe3eef30992bf65"`);
        await queryRunner.query(`DROP TABLE "user_payment_methods"`);
    }

}
