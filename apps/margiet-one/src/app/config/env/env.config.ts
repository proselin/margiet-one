import Joi from 'joi';

import { DEFAULT, EnvName, NODE_ENV } from '../../common';

export function envValidation(config: Record<string, unknown>) {
  const appEnv = {
    [EnvName.NODE_ENV]: Joi.string()
      .allow(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION)
      .default(NODE_ENV.DEVELOPMENT),

    [EnvName.SERVER_HOST]: Joi.string().default(DEFAULT.SERVER_HOST),
    [EnvName.SERVER_PORT]: Joi.number().port().default(DEFAULT.SERVER_PORT),
    [EnvName.SERVER_PREFIX]: Joi.string().default(DEFAULT.SERVER_PREFIX),
    [EnvName.SERVER_TIMEOUT]: Joi.number().default(DEFAULT.SERVER_TIMEOUT),
    [EnvName.SERVER_NAME]: Joi.string().default(DEFAULT.SERVER_NAME),
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

  const swaggerEnv = {
    [EnvName.SERVER_API_DOCUMENT_PREFIX]: Joi.string().default(
      DEFAULT.SERVER_API_DOCUMENT_PREFIX
    ),
  };

  const cacheEnv = {
    [EnvName.CACHE_MAX]: Joi.number().default(DEFAULT.CACHE_MAX),
    [EnvName.CACHE_REFRESH_THRESHOLD]: Joi.any().default(
      DEFAULT.CACHE_REFRESH_THRESHOLD
    ),
    [EnvName.CACHE_TTL]: Joi.any().default(DEFAULT.CACHE_TTL),
  };

  const { value, error } = Joi.object({
    ...appEnv,
    ...redisEnv,
    ...minioEnv,
    ...cacheEnv,
    ...databaseEnv,
    ...swaggerEnv,
  })
    .unknown(true)
    .validate(config);

  if (error) {
    throw new Error(`Environment variable validation error: ${error.message}`);
  }

  return value;
}
