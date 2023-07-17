import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1683398896522 implements MigrationInterface {
    name = 'undefinedigration1683398896522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loginTracker" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "loginTracker" ADD CONSTRAINT "UQ_19131f8a3ac6de6e2ca8a991452" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "loginTracker" ADD CONSTRAINT "FK_19131f8a3ac6de6e2ca8a991452" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loginTracker" DROP CONSTRAINT "FK_19131f8a3ac6de6e2ca8a991452"`);
        await queryRunner.query(`ALTER TABLE "loginTracker" DROP CONSTRAINT "UQ_19131f8a3ac6de6e2ca8a991452"`);
        await queryRunner.query(`ALTER TABLE "loginTracker" DROP COLUMN "userId"`);
    }

}
