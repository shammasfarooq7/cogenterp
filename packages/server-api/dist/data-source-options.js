"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let dataSourceOptions = {
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ''),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['src/**/**.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    seeds: ['src/database/seeds/**/*.ts'],
};
exports.dataSourceOptions = dataSourceOptions;
//# sourceMappingURL=data-source-options.js.map