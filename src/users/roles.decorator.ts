import { SetMetadata } from "@nestjs/common";
import { UserRole } from "./entities/role.entity";

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
