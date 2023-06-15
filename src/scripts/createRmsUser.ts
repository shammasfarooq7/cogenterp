import { IsNull, Connection, createConnection } from 'typeorm';
// import { AppDataSource } from "../data-source"
import { Role, UserRole } from '../users/entities/role.entity';
import { dataSourceOptions } from '../data-source-options';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';


const userData = {
    email: "awais@cogentnetworks.com",
    // phoneNumber: "",
    // status: UserStatus.DIRECT,
    // vendorName: "THis is Vendor Name",
    // engagementType: EngagementType.FSE,
    // rpocName: "rpocName",
    // rpocEmail: "rpocEmail",
    // rpocContactNumber: "rpocContactNumber",
    firstName: "Awais",
    lastName: "Farooq",
    // middleName: "Farooq",
    // idCardNumber: "idCardNumber",
    // taxNumber: "taxNumber",
    // languages: ["English", "Urdu"],
    // skillSet: ["Football", "Programming"],
    // availableTools: ["bike", "laptop"],
    // nationality: "Pakistan",
    // region: "Asia",
    // country: "Pakistan",
    // city: "Lahore",
    // postalCode: "54000",
    // addressLine1: "Address1",
    // addressLine2: "Address2",
    // whatsappNumber: "123",
    // cogentEmail: "cogent4Email",
    // descriptionColor: "black",
    // hourlyRate: "35",
    // halfDayRate: "200",
    // fullDayRate: "400",
    // monthlyRate: "4000",
    // anyExtraRate: "none",
    // // onboardedBy: "Admin",
    // transport: "Personal",
    // isOnboarded: true
}

// const paymentMethod = {
//     accountType: "Current",
//     accountTitle: "My Account Title",
//     beneficiaryFirstName: "Shammas",
//     beneficiaryMiddleName: "",
//     beneficiaryLastName: "Farooq",
//     beneficiaryAddress: "beneficiaryAddress",
//     sortCode: "sortCode",
//     accountNumber: "accountNumber",
//     iban: "Iban",
//     swiftCode: "swiftCode",
//     bankName: "SCB",
//     branchName: "Lahore",
//     bankAddress: "bank address",
// }

const createRmsUser = async () => {
    const AppDataSource: Connection = await createConnection({
        ...dataSourceOptions,
        entities: ['src/**/**.entity.ts'],
    });

    const userRepo = AppDataSource.getRepository(User);

    const rmsUser = await userRepo.findOne({
        relations: { roles: true },
        where: {
            roles: {
                role: UserRole.RMS
            },
            deletedAt: IsNull(),
        }
    })

    if (!rmsUser) {
        const roleType = UserRole.RMS;

        const roleRepo = AppDataSource.getRepository(Role)
        const role = await roleRepo.findOneBy({ role: roleType });
        // const userPaymentMethodRepo = AppDataSource.getRepository(UserPaymentMethod);
        let password = "Demo@123";
        password = await bcrypt.hash(password, await bcrypt.genSalt())

        const newRmsUser = await userRepo.save({
            ...userData,
            onboardedAt: new Date(),
            password,
            roles: [role],
        });


        // await userPaymentMethodRepo.save({
        //     ...paymentMethod,
        //     user: newRmsUser
        // })

        console.log({ Message: "RMS User Created Successfully!" });
        return
    }
    console.log({ Message: "RMS User Already Exist!" });

}

const runScript = async () => {
    try {
        await createRmsUser();
        process.exit();
    } catch (error) {
        console.log({ error });
    }
}

runScript()