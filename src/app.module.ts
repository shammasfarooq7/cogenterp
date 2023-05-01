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
import { AzureBlobModule } from './azure-blob/azure-blob.module';
import { AzureBlobModule } from './azure-blob/azure-blob.module';
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
  }),
  UsersModule,
  AuthModule,
  UserPaymentMethodsModule,
  ConfigModule.forRoot(),
  AzureBlobModule
  ],
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
