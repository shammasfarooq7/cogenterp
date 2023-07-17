import { Connection, createConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { dataSourceOptions } from '../data-source-options';
import { User } from '../users/entities/user.entity';
import { Role, UserRole } from '../users/entities/role.entity';
import { Customer } from '../modules/customer/entities/customer.entity';
import { AgreedSla, Coverage, IncrementTime, Project, ServiceType, SowDesc, Status, SupportModel, TalentLevel, TechnologyType } from '../modules/project/entities/project.entity';
import { Currency, Jobsite, ServiceCatItem, SupportType } from '../modules/jobsite/entities/jobsite.entity';


const userData = {
  email: "customer@cogentnetworks.com",
  firstName: "Awais",
  lastName: "Farooq",
}

const customerData = {
  name: "Facebook",
  vendorReference: "Vendor 1",
  website: faker.internet.url().toString(),
  establishYear: faker.date.past().getFullYear().toString(),
  employeesCount: faker.number.toString().toString(),
  dispatchGroupEmail: faker.internet.email().toString(),
  city: faker.location.city().toString(),
  employeeCountLinkedin: faker.number.toString(),
  phone: faker.phone.number().toString(),
  country: faker.location.country().toString(),
  postCode: faker.location.zipCode().toString(),
  linkedinUrl: faker.internet.url().toString(),
  email: faker.internet.email().toString(),
  stateProvince: faker.location.state().toString(),
  address: faker.location.streetAddress().toString(),
  annualRevenue: faker.number.toString(),
  revenueSoftware: faker.number.toString(),
  revenueConsultancy: faker.number.toString(),
  revenueSupport: faker.number.toString(),
  revenueLogistics: faker.number.toString(),
  revenueOther: faker.number.toString(),
  contactNumber: faker.phone.number().toString(),
  addressLine1: faker.location.streetAddress().toString(),
  addressLine2: faker.location.secondaryAddress().toString(),
  emailId: faker.internet.email().toString(),
  mobile: faker.phone.number.toString(),
  whatsappNumber: faker.phone.number.toString(),
  whatsappGroup: faker.word.toString(),
  whatsappLink: faker.internet.url().toString(),
  cogentEmailId: faker.internet.email(),
  workPermitStatus: faker.word.toString(),
  primaryTechService: faker.word.toString(),
  fieldService: faker.word.toString(),
  keyCustomerSupport: faker.word.toString(),
  languageSupport: faker.word.toString(),
  countrySupported: faker.word.toString(),
  certification: faker.word.toString(),
  customerAbbr: "FB",
}

const projectData =  {
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  status: Status.Planning,
  name: faker.word.toString(),
  clientPartnerName: faker.company.name().toString(),
  custSdmName: faker.word.toString(),
  custSdmEmail: faker.internet.email().toString(),
  custSdmContNum: faker.phone.number.toString(),
  cogSdmName: faker.person.firstName.toString(),
  cogSdmNum: faker.phone.number.toString(),
  cogSdmCont: faker.phone.number.toString(),
  cogSdEmail: faker.internet.email().toString(),
  cogSdContNum: faker.phone.number.toString(),
  agreedSla: [AgreedSla.SBD],
  coverage: [Coverage.fiveD9H],
  technologyType: [TechnologyType.LINUX],
  serviceType: [ServiceType.BREAKFIX],
  supportModel: [SupportModel.FTE_NBF],
  talentLevel: [TalentLevel.L0],
  cancelPolicy: faker.lorem.sentence(),
  dispatchAgreed: 5,
  incrementTime: IncrementTime.FIFTEEN,
  sow: faker.lorem.sentence().toString(),
  sowDesc: SowDesc.BREAKFIX,
  owJd: faker.lorem.sentence().toString(),
  serviceDeliv: faker.lorem.sentence().toString(),
  ssInst: faker.lorem.sentence().toString(),
  asInst: faker.lorem.sentence().toString(),
  toolsReq: faker.lorem.sentence().toString(),
  namedWorker: true,
  assignedWorker: faker.person.firstName.toString(),
  technicalSkill: faker.lorem.sentence().toString(),
  behSkills: faker.lorem.word().toString(),
  experienceReq: faker.lorem.word().toString(),
  langReq: faker.lorem.word().toString(),
  trainReq: faker.lorem.word().toString(),
  trainDoc: faker.lorem.word().toString(),
  reqTools: faker.lorem.word().toString(),
  reqSoft: faker.lorem.word().toString(),
  specReq: faker.lorem.word().toString(),
  cl1ee: faker.lorem.word().toString(),
  cl1ec: faker.lorem.word().toString(),
  cl2ee: faker.lorem.word().toString(),
  cl2ec: faker.lorem.word().toString(),
  cgl1ee: faker.lorem.word().toString(),
  cgl1ec: faker.lorem.word().toString(),
  cfl2ee: faker.lorem.word().toString(),
  cgl2ec: faker.lorem.word().toString(),
  code: faker.string.numeric.toString(),
  projectNumber: faker.string.numeric.toString()
};

const jobsiteData = {
  name: faker.company.name.toString(),
  country: faker.location.country().toString(),
  city: faker.location.city().toString(),
  state: faker.location.state().toString(),
  province: faker.location.state().toString(),
  postcode: faker.location.zipCode().toString(),
  siteAddress: faker.location.streetAddress().toString(),
  pocName: faker.person.firstName.toString(),
  pocContactNumber: faker.phone.number.toString(),
  pocEmailAdrress: faker.internet.email().toString(),
  ppe1h: faker.lorem.word().toString(),
  ppe2h: faker.lorem.word().toString(),
  ppe3h: faker.lorem.word().toString(),
  ppe4h: faker.lorem.word().toString(),
  ppe5h: faker.lorem.word().toString(),
  ppe6h: faker.lorem.word().toString(),
  ppe7h: faker.lorem.word().toString(),
  ppe8h: faker.lorem.word().toString(),
  tandm30: faker.lorem.word().toString(),
  tandm1h: faker.lorem.word().toString(),
  afth: faker.lorem.word().toString(),
  wknd: faker.lorem.word().toString(),
  ph: faker.lorem.word().toString(),
  sat: false,
  sun: false,
  siteTiming: faker.date.future().toLocaleTimeString(),
  timeZone: faker.address.timeZone(),
  dispatchAgreed: 5,
  incrementTime: IncrementTime.FIFTEEN,
  serviceType: [ServiceType.BREAKFIX],
  supportType: [SupportType.FSE],
  serviceCatItem: [ServiceCatItem.BREAKFIX],
  agreedSla: [AgreedSla.NBD],
  coverage: [Coverage.fiveD9H],
  technologyType: [TechnologyType.EUC],
  currency: [Currency.EUR],
}

const createData = async () => {
  const AppDataSource: Connection = await createConnection({
      ...dataSourceOptions,
      entities: ['src/**/**.entity.ts'],
  });

  const userRepo = AppDataSource.getRepository(User);
  const customerRepo = AppDataSource.getRepository(Customer);
  const projectRepo = AppDataSource.getRepository(Project);
  const jobsiteRepo = AppDataSource.getRepository(Jobsite);


  const customer = await userRepo.findOne({ where: { email: userData.email } });

  if (!customer) {
      const roleType = UserRole.CUSTOMER;

      const roleRepo = AppDataSource.getRepository(Role)
      const role = await roleRepo.findOneBy({ role: roleType });
      let password = "Demo@123";
      password = await bcrypt.hash(password, await bcrypt.genSalt())

      const user = await userRepo.save({
          ...userData,
          onboardedAt: new Date(),
          password,
          roles: [role],
      });

      const customer = await customerRepo.save({
        ...customerData,
        user: user
      })

      const project = await projectRepo.save({
        ...projectData,
        customer: customer
      })

      const jobsite = await jobsiteRepo.save({
        ...jobsiteData,
        project: project
      })

      console.log({ Message: "Data created" });
      return
  }
  console.log({ Message: "User Already Exist!" });

}

const runScript = async () => {
  try {
      await createData();
      process.exit();
  } catch (error) {
      console.log({ error });
  }
}

runScript()