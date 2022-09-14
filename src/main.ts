import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';

import * as session from 'express-session';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';

import { AppModule } from './app.module';
import { setupSwagger } from './setupSwagger';

async function bootstrap() {
  const PORT = process.env.PORT;

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

  const redisClient = redis.createClient({ url: process.env.REDIS_URI });
  const RedisStore = connectRedis(session);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
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
