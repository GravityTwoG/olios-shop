import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfigService } from './configuration.schema';

// Setup Cross Origin Request Forgery headers
export function setupCORS(app: NestExpressApplication) {
  const configService = app.get<AppConfigService>(ConfigService);
  const ENVIRONMENT = configService.get('ENVIRONMENT', { infer: true });
  let origin: string[] | ((origin: string, callback: any) => void) = [
    'http://localhost:3000',
  ];

  if (ENVIRONMENT === 'local' || ENVIRONMENT === 'staging') {
    origin = function (_, callback) {
      return callback(null, true);
    };
  }

  app.enableCors({
    origin,
    credentials: true,
  });
}
