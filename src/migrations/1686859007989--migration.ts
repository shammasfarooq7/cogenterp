import { MigrationInterface, QueryRunner } from "typeorm";

export class undefinedigration1686859007989 implements MigrationInterface {
    name = 'undefinedigration1686859007989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "FK_fc7c5fb11d1ef2c578aac8d65e2"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "FK_863605c732ba0a6c6aa4586c55a"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "PK_bcab34f5b9722b1fd4d077b7298"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "checkIn"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "checkOut"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "sdId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "sdCheckIn"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "sdCheckOut"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "feopsCheckIn"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "feopsCheckOut"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "ticketDateId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "resourceId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "PK_bcab34f5b9722b1fd4d077b7298" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "checkIn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "checkOut" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "sdId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "sdCheckIn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "sdCheckOut" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "feopsCheckIn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "feopsCheckOut" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "resourceId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "ticketDateId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "ticketDatesId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "PK_bcab34f5b9722b1fd4d077b7298"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "PK_472455d3da5a9e045443692531d" PRIMARY KEY ("id", "ticketDatesId")`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "resourcesId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "PK_472455d3da5a9e045443692531d"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "PK_35a635e69c3431db03355b70425" PRIMARY KEY ("id", "ticketDatesId", "resourcesId")`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "PK_35a635e69c3431db03355b70425"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "PK_b9ead88a6b7d3064892e8ccb39a" PRIMARY KEY ("ticketDatesId", "resourcesId")`);
        await queryRunner.query(`CREATE INDEX "IDX_963b612d46d3cfaccfd0ba633c" ON "time_sheets" ("ticketDatesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_233a7a095c0d687d6b345718c3" ON "time_sheets" ("resourcesId") `);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "FK_fc7c5fb11d1ef2c578aac8d65e2" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "FK_863605c732ba0a6c6aa4586c55a" FOREIGN KEY ("ticketDateId") REFERENCES "ticket_dates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "FK_963b612d46d3cfaccfd0ba633c7" FOREIGN KEY ("ticketDatesId") REFERENCES "ticket_dates"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "FK_233a7a095c0d687d6b345718c39" FOREIGN KEY ("resourcesId") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "FK_233a7a095c0d687d6b345718c39"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "FK_963b612d46d3cfaccfd0ba633c7"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "FK_863605c732ba0a6c6aa4586c55a"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "FK_fc7c5fb11d1ef2c578aac8d65e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_233a7a095c0d687d6b345718c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_963b612d46d3cfaccfd0ba633c"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "PK_b9ead88a6b7d3064892e8ccb39a"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "PK_35a635e69c3431db03355b70425" PRIMARY KEY ("id", "ticketDatesId", "resourcesId")`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "PK_35a635e69c3431db03355b70425"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "PK_472455d3da5a9e045443692531d" PRIMARY KEY ("id", "ticketDatesId")`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "resourcesId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "PK_472455d3da5a9e045443692531d"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "PK_bcab34f5b9722b1fd4d077b7298" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "ticketDatesId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "ticketDateId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "resourceId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "feopsCheckOut"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "feopsCheckIn"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "sdCheckOut"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "sdCheckIn"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "sdId"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "checkOut"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "checkIn"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP CONSTRAINT "PK_bcab34f5b9722b1fd4d077b7298"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "resourceId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "ticketDateId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "feopsCheckOut" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "feopsCheckIn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "sdCheckOut" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "sdCheckIn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "sdId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "checkOut" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "checkIn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "PK_bcab34f5b9722b1fd4d077b7298" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "FK_863605c732ba0a6c6aa4586c55a" FOREIGN KEY ("ticketDateId") REFERENCES "ticket_dates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_sheets" ADD CONSTRAINT "FK_fc7c5fb11d1ef2c578aac8d65e2" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
