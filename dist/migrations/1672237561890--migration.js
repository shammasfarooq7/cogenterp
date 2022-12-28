"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undefinedigration1672237561890 = void 0;
class undefinedigration1672237561890 {
    constructor() {
        this.name = 'undefinedigration1672237561890';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.undefinedigration1672237561890 = undefinedigration1672237561890;
//# sourceMappingURL=1672237561890--migration.js.map