"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.UserRole = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var UserRole;
(function (UserRole) {
    UserRole["RMS"] = "rms";
    UserRole["SD"] = "sd";
    UserRole["RESOURCE"] = "resource";
    UserRole["FEOPS"] = "feops";
    UserRole["ADMIN"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
(0, graphql_1.registerEnumType)(UserRole, {
    name: 'userRoles',
    description: 'The user role assigned',
});
let Role = class Role {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        default: UserRole.RESOURCE,
    }),
    (0, graphql_1.Field)(() => UserRole),
    __metadata("design:type", String)
], Role.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.roles),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Role.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Role.prototype, "updatedAt", void 0);
Role = __decorate([
    (0, typeorm_1.Entity)({ name: 'roles' }),
    (0, graphql_1.ObjectType)()
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map