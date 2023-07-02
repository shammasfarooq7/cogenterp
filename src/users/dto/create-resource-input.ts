import { InputType, Field } from '@nestjs/graphql';
import { IdCardType, InterviewStatus, EngagementType, ResourceStatus} from '../../modules/resources/entity/resource.entity';

@InputType()
export class CreateResourceInput {

    @Field(() => String)
    email: string;

    @Field({ nullable: true, defaultValue: null })
    phoneNumber: string;

    @Field(() => ResourceStatus)
    status: ResourceStatus;

    @Field({ nullable: true })
    vendorName: string;

    @Field(() => EngagementType)
    engagementType: EngagementType;

    @Field({ nullable: true })
    rpocName: string;

    @Field(() => String, { nullable: true })
    rpocEmail: string;

    @Field({ nullable: true, defaultValue: null })
    rpocContactNumber: string;

    @Field({ nullable: true })
    firstName: string;

    @Field({ nullable: true })
    lastName: string;

    @Field({ nullable: true })
    middleName: string;

    @Field({ nullable: true })
    idCardNumber: string;

    @Field({ nullable: true })
    taxNumber: string;

    @Field(() => [String])
    languages: string[];

    @Field(() => [String])
    skillSet: string[];

    @Field(() => [String])
    availableTools: string[];

    @Field({ nullable: true })
    nationality: string;

    @Field({ nullable: true })
    region: string;

    @Field({ nullable: true })
    country: string;

    @Field({ nullable: true })
    state: string;

    @Field({ nullable: true })
    city: string;

    @Field({ nullable: true })
    postalCode: string;

    @Field({ nullable: true })
    addressLine1: string;

    @Field({ nullable: true })
    addressLine2: string;

    @Field({ nullable: true, defaultValue: null })
    whatsappNumber: string;

    @Field(() => String, { nullable: true })
    cogentEmail: string;

    @Field({ nullable: true })
    descriptionColor: string;

    @Field({ nullable: true })
    hourlyRate: string;

    @Field({ nullable: true })
    halfDayRate: string;

    @Field({ nullable: true })
    fullDayRate: string;

    @Field({ nullable: true })
    monthlyRate: string;

    @Field({ nullable: true })
    anyExtraRate: string;

    // Payment Mehtod Input Type

    @Field(() => String, { nullable: true })
    accountType: string;

    @Field(() => String, { nullable: true })
    accountTitle: string;

    @Field(() => String)
    beneficiaryFirstName: string;

    @Field(() => String)
    beneficiaryMiddleName: string;

    @Field(() => String)
    beneficiaryLastName: string;

    @Field(() => String)
    beneficiaryAddress: string;

    @Field({ nullable: true })
    sortCode: string;

    @Field(() => String)
    accountNumber: string;

    @Field(() => String)
    iban: string;

    @Field(() => String)
    swiftCode: string;

    @Field(() => String)
    bankName: string;

    @Field(() => String)
    branchName: string;

    @Field(() => String)
    bankAddress: string;

    @Field({ nullable: true })
    transport: string;

    @Field({ nullable: true })
    mobility: string;

    // @Field({ nullable: true })
    // onboardedBy: string;

    @Field({ nullable: true })
    resumeDocUrl: string;

    @Field({ nullable: true })
    identityDocUrl: string;

    @Field({ nullable: true })
    idCardType: IdCardType

    @Field({ nullable: true })
    interviewStatus: InterviewStatus

    @Field({ nullable: true })
    isOnboarded: boolean;

    @Field()
    workPermitStatus: string

    @Field()
    mobileNumber: string

    @Field({ nullable: true })
    contactNumber: string

    @Field({ nullable: true })
    whatsappGroup: string

    @Field({ nullable: true })
    whatsappGroupLink: string

    @Field({ nullable: true })
    availability: string

    @Field({ nullable: true })
    contractDocuments: boolean

}
