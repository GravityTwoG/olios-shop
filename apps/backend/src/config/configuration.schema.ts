import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsString, validateSync } from 'class-validator';

export enum Environment {
  local = 'local',
  staging = 'staging',
  production = 'production',
}

export class EnvironmentVariables {
  @IsInt()
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  SESSION_SECRET: string;

  @IsString()
  REDIS_URI: string;

  @IsString()
  S3_ENDPOINT: string;

  @IsString()
  S3_ACCESS_KEY_ID: string;

  @IsString()
  S3_SECRET_ACCESS_KEY: string;

  @IsString()
  FILE_STORAGE_URL: string;

  @IsEnum(Environment)
  ENVIRONMENT: Environment;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

export type AppConfigService = ConfigService<EnvironmentVariables, true>;
