import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino/Logger';

import { AppModule } from './app.module';

import { setupSwagger } from './config/setupSwagger';
import { AppConfigService } from './config/configuration.schema';
import { setupCORS } from './config/setupCors';
import { setupSessions } from './config/setupSessions';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = app.get(Logger);
  app.useLogger(logger);

  const configService = app.get<AppConfigService>(ConfigService);

  // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  app.set('trust proxy', 1);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); // validation by class-validator, class-transformer

  setupSwagger(app);
  setupCORS(app);
  await setupSessions(app);

  const ENVIRONMENT = configService.get('ENVIRONMENT', { infer: true });
  if (ENVIRONMENT === 'production' || ENVIRONMENT === 'staging') {
    app.setGlobalPrefix('/api/v1');
  }

  const PORT = configService.get('PORT', { infer: true });

  await app.listen(PORT);
  logger.log(`App listening on port: ${PORT}`, 'NestApplication');
  logger.log(`URL: http://localhost:${PORT}`, 'NestApplication');
}

bootstrap();
