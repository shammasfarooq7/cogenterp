import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  vendorReference: string;

  @Field(() => String)
  website: string;

  @Field(() => String)
  establishYear: string;

  @Field(() => String)
  employeesCount: string;

  @Field(() => String)
  dispatchGroupEmail: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  employeeCountLinkedin: string;

  @Field(() => String, {nullable: false})
  phone: string;

  @Field(() => String, {nullable: false})
  country: string;

  @Field(() => String, {nullable: false})
  postCode: string;

  @Field(() => String)
  linkedinUrl: string;

  @Field(() => String)
  email: string;

  @Field(() => String, {nullable: false})
  stateProvince: string;

  @Field(() => String, {nullable: false})
  address: string;

  @Field(() => String)
  annualRevenue: string;

  @Field(() => String)
  revenueSoftware: string;

  @Field(() => String)
  revenueConsultancy: string;

  @Field(() => String)
  revenueSupport: string;

  @Field(() => String)
  revenueLogistics: string;

  @Field(() => String)
  revenueOther: string;

  @Field(() => String)
  contactNumber: string;

  @Field(() => String)
  addressLine1: string;

  @Field(() => String)
  addressLine2: string;

  @Field(() => String)
  emailId: string;

  @Field(() => String)
  mobile: string;

  @Field(() => String)
  whatsappNumber: string;

  @Field(() => String)
  whatsappGroup: string;

  @Field(() => String)
  whatsappLink: string;

  @Field(() => String, {nullable: false})
  cogentEmailId: string;

  @Field(() => String)
  workPermitStatus: string;

  @Field(() => String)
  primaryTechService: string;

  @Field(() => String)
  fieldService: string;

  @Field(() => String)
  keyCustomerSupport: string;

  @Field(() => String)
  languageSupport: string;

  @Field(() => String)
  countrySupported: string;

  @Field(() => String)
  certification: string;

  @Field(() => String)
  customerAbbr: string;
}
