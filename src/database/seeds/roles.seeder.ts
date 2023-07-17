import { Role, UserRole } from "../../users/entities/role.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

const roles = [
  {
    role: UserRole.ADMIN,
  },
  {
    role: UserRole.RMS,
  },
  {
    role: UserRole.RESOURCE,
  },
  {
    role: UserRole.FEOPS,
  },
  {
    role: UserRole.SD,
  },
  {
    role: UserRole.CUSTOMER,
  },
];

export default class RolesSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Role);

    for (const role of roles) {
      const b = await repository.findOneBy({ role: role.role });
      if (!b) {
        await repository.insert(role);
      }
    }
  }
}