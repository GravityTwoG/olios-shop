import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';

import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const PORT = process.env.PORT;
  const redisClient = redis.createClient({ url: process.env.REDIS_URI });
  const RedisStore = connectRedis(session);
  const app = await NestFactory.create(AppModule);
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
  app.use(
    graphqlUploadExpress({
      maxFiles: 5,
      maxFileSize: 10000000,
    }),
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
      store: new RedisStore({ client: redisClient }),
    }),
  );
  await app.listen(PORT);
  console.log(`App listening on port: ${PORT}`);
}
bootstrap();
