import { IsNull, Connection, createConnection } from 'typeorm';
import { Role, UserRole } from '../users/entities/role.entity';
import { dataSourceOptions } from '../data-source-options';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';


const userData = {
    email: "sd@cogentnetworks.com",
    firstName: "Awais",
    lastName: "Farooq",
}

const createSdUser = async () => {
    const AppDataSource: Connection = await createConnection({
        ...dataSourceOptions,
        entities: ['src/**/**.entity.ts'],
    });

    const userRepo = AppDataSource.getRepository(User);

    const sdUser = await userRepo.findOne({
        relations: { roles: true },
        where: {
            roles: {
                role: UserRole.SD
            },
            deletedAt: IsNull(),
        }
    })

    if (!sdUser) {
        const roleType = UserRole.SD;

        const roleRepo = AppDataSource.getRepository(Role)
        const role = await roleRepo.findOneBy({ role: roleType });
        let password = "Demo@123";
        password = await bcrypt.hash(password, await bcrypt.genSalt())

        const newSdUser = await userRepo.save({
            ...userData,
            onboardedAt: new Date(),
            password,
            roles: [role],
        });

        console.log({ Message: "SD User Created Successfully!" });
        return
    }
    console.log({ Message: "SD User Already Exist!" });

}

const runScript = async () => {
    try {
        await createSdUser();
        process.exit();
    } catch (error) {
        console.log({ error });
    }
}

runScript()