import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService, Environment } from './configuration.schema';

type Callback = (err: Error | null, allow?: boolean) => void;

// Setup Cross Origin Request Forgery headers
export function setupCORS(app: NestExpressApplication) {
  const configService = app.get<AppConfigService>(ConfigService);
  const ENVIRONMENT = configService.get('ENVIRONMENT', { infer: true });
  let origin: string[] | ((origin: string, callback: Callback) => void) = [
    'http://localhost:3000',
  ];

  if (
    ENVIRONMENT === Environment.local ||
    ENVIRONMENT === Environment.staging
  ) {
    origin = function (_, callback) {
      return callback(null, true);
    };
  }

  app.enableCors({
    origin,
    credentials: true,
  });
}
