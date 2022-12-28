"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const data_source_options_1 = require("./data-source-options");
exports.AppDataSource = new typeorm_1.DataSource(data_source_options_1.dataSourceOptions);
//# sourceMappingURL=data-source.js.map