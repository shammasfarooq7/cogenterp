import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
export default class RolesSeeder implements Seeder {
    run(dataSource: DataSource): Promise<any>;
}
