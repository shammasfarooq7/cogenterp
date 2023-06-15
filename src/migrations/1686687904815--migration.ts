import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686687904815 implements MigrationInterface {
    name = 'undefinedigration1686687904815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "time_sheets" ("id" SERIAL NOT NULL, "checkIn" character varying NOT NULL, "checkOut" character varying NOT NULL, "sdId" character varying NOT NULL, "sdCheckIn" character varying NOT NULL, "sdCheckOut" character varying NOT NULL, "feopsCheckIn" character varying NOT NULL, "feopsCheckOut" character varying NOT NULL, "resourceId" character varying NOT NULL, "ticketDateId" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bcab34f5b9722b1fd4d077b7298" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "time_sheets"`);
    }

}
