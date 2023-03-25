import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role, UserRole } from "./entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>) {}

  async findByType(role: UserRole): Promise<Role> {
    return await this.roleRepo.findOneBy({ role });
  }
}
