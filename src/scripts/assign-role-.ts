import { User } from '../users/entities/user.entity';
import { Connection, createConnection } from 'typeorm';
// import { AppDataSource } from "../data-source"
import { Role, UserRole } from '../users/entities/role.entity';
import { UserPaymentMethod } from '../modules/userPaymentMethods/entity/userPaymentMethod.entity';
import { dataSourceOptions } from '../data-source-options';
import { LoginTracker } from '../users/entities/login-tracker.entity';

const assignRole = async () => {
    const AppDataSource: Connection = await createConnection({
        ...dataSourceOptions,
        entities: [User, Role, UserPaymentMethod, LoginTracker],

    });

    const userRepo = AppDataSource.getRepository(User);

    const rmsUser = await userRepo.findOne({
        relations: { roles: true },
        where: {
            email: "awais@cogentnetworks.com"
        }
    })

    if (rmsUser && !rmsUser?.roles?.length) {
        const roleType = UserRole.RMS;
        const roleRepo = AppDataSource.getRepository(Role)
        const role = await roleRepo.findOneBy({ role: roleType });
        if (role) {
            rmsUser.roles = [role]
            await userRepo.save(rmsUser)
            console.log({ Message: "RMS User Role Updated Successfully!" });
            return
        }
        console.log({ Message: "No Role Found!" });

    }
    console.log({ Message: "No RMS User Found!" });
}

const runScript = async () => {
    try {
        await assignRole();
        process.exit();
    } catch (error) {
        console.log({ error });
    }
}

runScript()