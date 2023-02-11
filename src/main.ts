import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';

import session from 'express-session';
import { createClient as createRedisClient } from 'redis';
import connectRedis from 'connect-redis';

import { AppModule } from './app.module';
import { setupSwagger } from './setupSwagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); // validation by class-validator, class-transformer

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const configService = app.get(ConfigService);
  const REDIS_URI = configService.get('REDIS_URI');
  const SESSION_SECRET = configService.get('SESSION_SECRET');
  const PORT = configService.get<number>('PORT') || 3000;

  const redisClient = createRedisClient({ url: REDIS_URI, legacyMode: true });
  const RedisStore = connectRedis(session);

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 7 * DAY, httpOnly: true, sameSite: 'lax' },
      store: new RedisStore({ client: redisClient }),
    }),
  );

  await app.listen(PORT);
  Logger.log(`App listening on port: ${PORT}`, 'NestApplication');
}
bootstrap();
