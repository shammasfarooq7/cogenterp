import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { dataSourceOptions } from './data-source-options';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
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
  UsersModule
  ],
  providers: [],
})
export class AppModule {}
