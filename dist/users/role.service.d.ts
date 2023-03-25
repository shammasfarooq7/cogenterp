import { Role, UserRole } from "./entities/role.entity";
import { Repository } from "typeorm";
export declare class RoleService {
    private readonly roleRepo;
    constructor(roleRepo: Repository<Role>);
    findByType(role: UserRole): Promise<Role>;
}
