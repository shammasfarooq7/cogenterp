import { User } from "./user.entity";
export declare enum UserRole {
    RMS = "rms",
    SD = "sd",
    RESOURCE = "resource",
    FEOPS = "feops",
    ADMIN = "admin"
}
export declare class Role {
    id: string;
    role: UserRole;
    users: User[];
    createdAt: string;
    updatedAt: string;
}
