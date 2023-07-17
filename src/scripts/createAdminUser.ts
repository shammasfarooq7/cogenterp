import { IsNull, Connection, createConnection } from 'typeorm';
import { Role, UserRole } from '../users/entities/role.entity';
import { dataSourceOptions } from '../data-source-options';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';


const userData = {
    email: "admin@cogentnetworks.com",
    firstName: "Awais",
    lastName: "Farooq",
}

const createAdminUser = async () => {
    const AppDataSource: Connection = await createConnection({
        ...dataSourceOptions,
        entities: ['src/**/**.entity.ts'],
    });

    const userRepo = AppDataSource.getRepository(User);

    const adminUser = await userRepo.findOne({
        relations: { roles: true },
        where: {
            roles: {
                role: UserRole.ADMIN
            },
            deletedAt: IsNull(),
        }
    })

    if (!adminUser) {
        const roleType = UserRole.ADMIN;

        const roleRepo = AppDataSource.getRepository(Role)
        const role = await roleRepo.findOneBy({ role: roleType });
        let password = "Demo@123";
        password = await bcrypt.hash(password, await bcrypt.genSalt())

        const newAdminUser = await userRepo.save({
            ...userData,
            onboardedAt: new Date(),
            password,
            roles: [role],
        });

        console.log({ Message: "Admin User Created Successfully!" });
        return
    }
    console.log({ Message: "Admin User Already Exist!" });

}

const runScript = async () => {
    try {
        await createAdminUser();
        process.exit();
    } catch (error) {
        console.log({ error });
    }
}

runScript()