import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

import { AppConfigService, Environment } from './configuration.schema';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export async function setupSessions(app: NestExpressApplication) {
  const configService = app.get<AppConfigService>(ConfigService);
  const logger = app.get(Logger);

  const REDIS_URI = configService.get('REDIS_URI', { infer: true });
  const SESSION_SECRET = configService.get('SESSION_SECRET', { infer: true });
  const ENVIRONMENT = configService.get('ENVIRONMENT', { infer: true });

  const redisClient = createClient({ url: REDIS_URI });
  redisClient.on('error', (err) => logger.error('Redis Client Error: ', err));
  await redisClient.connect();

  let sameSite: 'strict' | 'lax' | 'none' = 'strict';
  let secure = true;

  if (ENVIRONMENT === Environment.local) {
    sameSite = 'lax';
    secure = false;
  } else if (ENVIRONMENT === Environment.staging) {
    sameSite = 'none';
    secure = true;
  } else if (ENVIRONMENT === Environment.production) {
    sameSite = 'strict';
    secure = true;
  }

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: { maxAge: 7 * DAY, httpOnly: true, sameSite, secure },
      store: new RedisStore({ client: redisClient }),
    }),
  );
}
