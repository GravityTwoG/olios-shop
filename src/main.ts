import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const redisClient = redis.createClient({ url: process.env.REDIS_URI });
  const RedisStore = connectRedis(session);
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // validation bu class-validator, class-transformer
  app.enableCors();
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
      store: new RedisStore({ client: redisClient }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT);
  console.log(`App listening on port: ${PORT}`);
}
bootstrap();
