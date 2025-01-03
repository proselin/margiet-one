export const DEFAULT = Object.freeze({
  NODE_ENV: 'development',
  SERVER_HOST: '0.0.0.0',
  SERVER_PREFIX: 'api',
  SERVER_PORT: 3000,
  SERVER_TIMEOUT: 60 * 5 * 60, // 5 minutes
  SERVER_NAME: 'Margiet-one',

  REDIS_HOST: 'localhost',
  REDIS_PORT: 6379,

  SERVER_API_DOCUMENT_PREFIX: '/swagger',
  MINIO_ENDPOINT: '172.17.0.1',
  MINIO_PORT: 9002,
  MINIO_USE_SSL: 0, //false
  MINIO_BUCKET: 'crawl-engine-image',

  //Default of cache manager
  CACHE_MAX: 100,
  CACHE_REFRESH_THRESHOLD: '1h',
  CACHE_TTL: '50m',
});
