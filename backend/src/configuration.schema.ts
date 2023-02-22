import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000).required(),

  DATABASE_URL: Joi.string().required(),
  SESSION_SECRET: Joi.string().required(),
  REDIS_URI: Joi.string().required(),

  MINIO_PROTOCOL: Joi.string().required(),
  MINIO_ENDPOINT: Joi.string().required(),
  MINIO_PORT: Joi.number().required(),
  MINIO_ACCESS_KEY: Joi.string().required(),
  MINIO_SECRET_KEY: Joi.string().required(),
  ENVIRONMENT: Joi.string().required().valid('local', 'staging', 'production'),
});
