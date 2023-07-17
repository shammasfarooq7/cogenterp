import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { dataSourceOptions } from './data-source-options';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './users/auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './users/roles.guard';
import { UserPaymentMethodsModule } from './modules/userPaymentMethods/userPaymentMethods.module';
import { JwtAuthGuard } from './users/auth/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { SendgridService } from './sendgrid/sendgrid.service';
import { AzureBlobService } from './azure-blob/azure-blob.service';
import { AzureBlobController } from './azure-blob/azure-blob.controller';
import { ResourcesModule } from './modules/resources/resources.module';
// import { AzureBlobModule } from './azure-blob/azure-blob.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ProjectModule } from './modules/project/project.module';
import { JobsiteModule } from './modules/jobsite/jobsite.module';
const { entities, migrations, ...options } = dataSourceOptions;

@Module({
  imports: [TypeOrmModule.forRoot({
    autoLoadEntities: true,
    ...options,
  }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: './src/schema.gql',
    playground: true,
    introspection: process.env.NODE_ENV !== 'production'
  }),
    UsersModule,
    ResourcesModule,
    AuthModule,
    UserPaymentMethodsModule,
  ConfigModule.forRoot(),
  TicketsModule,
  CustomerModule,
  ProjectModule,
  JobsiteModule,
    // AzureBlobModule
  ],
  controllers: [AzureBlobController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    SendgridService,
    AzureBlobService
  ],
})
export class AppModule {}
