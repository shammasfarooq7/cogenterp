"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("../../users/entities/role.entity");
const roles = [
    {
        role: role_entity_1.UserRole.ADMIN,
    },
    {
        role: role_entity_1.UserRole.RMS,
    },
    {
        role: role_entity_1.UserRole.RESOURCE,
    },
    {
        role: role_entity_1.UserRole.FEOPS,
    },
    {
        role: role_entity_1.UserRole.SD,
    },
];
class RolesSeeder {
    async run(dataSource) {
        const repository = dataSource.getRepository(role_entity_1.Role);
        for (const role of roles) {
            const b = await repository.findOneBy({ role: role.role });
            if (!b) {
                await repository.insert(role);
            }
        }
    }
}
exports.default = RolesSeeder;
//# sourceMappingURL=roles.seeder.js.map