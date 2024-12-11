import Joi from 'joi';
import { DEFAULT, EnvName, NODE_ENV } from '@/common';

export function envValidation(config: Record<string, unknown>) {
  const appEnv = {
    [EnvName.NODE_ENV]: Joi.string()
      .allow(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION)
      .default(NODE_ENV.DEVELOPMENT),

    [EnvName.SERVER_HOST]: Joi.string().default(DEFAULT.SERVER_HOST),
    [EnvName.SERVER_PORT]: Joi.number().port().default(DEFAULT.SERVER_PORT),
    [EnvName.SERVER_PREFIX]: Joi.string().default(DEFAULT.SERVER_PREFIX),
  };

  const redisEnv = {
    [EnvName.REDIS_HOST]: Joi.string().default(DEFAULT.REDIS_HOST),
    [EnvName.REDIS_PORT]: Joi.number().port().default(DEFAULT.REDIS_PORT),
    [EnvName.REDIS_PASSWORD]: Joi.string(),
    [EnvName.REDIS_USERNAME]: Joi.string().allow(''),
  };

  const minioEnv = {
    [EnvName.MINIO_ENDPOINT]: Joi.string().default(DEFAULT.MINIO_ENDPOINT),
    [EnvName.MINIO_PORT]: Joi.number().port().default(DEFAULT.MINIO_PORT),
    [EnvName.MINIO_USE_SSL]: Joi.boolean().default(DEFAULT.MINIO_USE_SSL),
    [EnvName.MINIO_ACCESS_KEY]: Joi.string().required(),
    [EnvName.MINIO_SECRET_KEY]: Joi.string().required(),
    [EnvName.MINIO_BUCKET]: Joi.string().default(DEFAULT.MINIO_BUCKET),
  };
  const databaseEnv = {
    [EnvName.DATASOURCE_URI]: Joi.string().uri(),
  };

  const queueEnv = {};

  const { value, error } = Joi.object({
    ...appEnv,
    ...redisEnv,
    ...minioEnv,
    ...queueEnv,
    ...databaseEnv,
  })
    .unknown(true)
    .validate(config);

  if (error) {
    throw new Error(`Environment variable validation error: ${error.message}`);
  }

  return value;
}
