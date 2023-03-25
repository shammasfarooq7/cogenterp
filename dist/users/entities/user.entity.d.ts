import { Role } from './role.entity';
export declare enum UserStatus {
    DIRECT = 0,
    INDIRECT = 1
}
export declare enum EngagementType {
    FSE = 0,
    FTE = 1,
    PTE = 2
}
export declare class User {
    id: string;
    email: string;
    password: string;
    phoneNumber: string;
    status: UserStatus;
    vendorName: string;
    engagementType: EngagementType;
    rpocName: string;
    rpocEmail: string;
    rpocContactNumber: string;
    firstName: string;
    lastName: string;
    middleName: string;
    idCardNumber: string;
    taxNumber: string;
    languages: string;
    nationality: string;
    region: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    addressLine1: string;
    addressLine2: string;
    whatsappNumber: string;
    cogentEmail: string;
    descriptionColor: string;
    hourlyRate: string;
    halfDayRate: string;
    fullDayRate: string;
    monthlyRate: string;
    anyExtraRate: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}
