import * as Joi from '@hapi/joi';

export const configValidationSchema = {
  PORT: Joi.number().required().default(5000),
  HOST_NAME: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES: Joi.string().required(),
  JWT_REFRESH_EXPIRES: Joi.string().required(),
  PASSWORD_SALT: Joi.string().required(),
  DATABASE_DIALECT: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  REDIS_NAME: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_TTL: Joi.number().min(1).required().default(10),
  IS_ACTIVE_ADMIN_PANEL: Joi.boolean().default(true),
  TTL_ACTIVATION_CODE: Joi.number().required(),
  MAILER_PORT: Joi.number().default(465),
  MAILER_PASS: Joi.string().required(),
  MAILER_SIGNATURE: Joi.string().required(),
  MAILER_HOST: Joi.string().required(),
  MAILER_USER: Joi.string().required(),
  COOKIE_SAME_SITE: Joi.boolean()
    .valid('lax', 'none', 'strict')
    .default('none'),
  COOKIE_HTTP_ONLY: Joi.boolean().default(true),
  COOKIE_PATH_REFRESH: Joi.string().default('/user/seance/'),
  COOKIE_SECURE: Joi.boolean().default(true),
  CLIENT_DOMAIN: Joi.string().required(),
  ERROR_LANGUAGE: Joi.string().default('ru').valid('ru', 'en'),
  REDIS_TOKEN_BLACK_LIST_KEY: Joi.string().default('tokenBlackList'),
  INTERVAL_TIME_MOCKED_STATUSES: Joi.number().default(60000),
  IS_MOCKED_STATUSES: Joi.boolean().default(true),
  ADMIN_PASSWORD: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().required(),
  HASH_SALT_ROUNDS: Joi.number().required(),
};

export const validationSchema = Joi.object(configValidationSchema);
