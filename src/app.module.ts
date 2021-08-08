import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, DatabaseConfig } from './configuration';
import { configValidationSchema } from './configuration.schema';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.STAGE}`,
      load: [configuration],
      cache: true,
      validationSchema: configValidationSchema,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database');
        return {
          dialect: 'postgres',
          database: dbConfig.name,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
