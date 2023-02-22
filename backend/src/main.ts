import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import session from 'express-session';
import { createClient as createRedisClient } from 'redis';
import connectRedis from 'connect-redis';

import { AppModule } from './app.module';
import { setupSwagger } from './setupSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); // validation by class-validator, class-transformer

  const environment = configService.get('ENVIRONMENT');
  let origin: string[] | ((origin: string, callback: any) => void) = [
    'http://localhost:3000',
  ];

  if (environment === 'local' || environment === 'staging') {
    origin = function (_, callback) {
      return callback(null, true);
    };
  }
  app.enableCors({
    origin,
    credentials: true,
  });

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const REDIS_URI = configService.get('REDIS_URI');
  const SESSION_SECRET = configService.get('SESSION_SECRET');
  const PORT = configService.get<number>('PORT') || 3000;

  const redisClient = createRedisClient({ url: REDIS_URI, legacyMode: true });
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  await redisClient.connect();
  const RedisStore = connectRedis(session);

  let sameSite: 'strict' | 'lax' | 'none' = 'strict';
  let secure = true;

  if (environment === 'local') {
    sameSite = 'lax';
    secure = false;
  } else if (environment === 'staging') {
    sameSite = 'none';
    secure = true;
  } else if (environment === 'production') {
    sameSite = 'strict';
    secure = true;
  }

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 7 * DAY, httpOnly: true, sameSite, secure },
      store: new RedisStore({ client: redisClient }),
    }),
  );

  await app.listen(PORT);
  Logger.log(`App listening on port: ${PORT}`, 'NestApplication');
}

bootstrap();
