export const enum DEFAULT {
  NODE_ENV = 'development',
  SERVER_HOST = '0.0.0.0',
  SERVER_PREFIX = 'api',
  SERVER_PORT = 3000,

  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,

  SERVER_API_DOCUMENT_PREFIX = '/swagger',
  MINIO_ENDPOINT = '172.17.0.1',
  MINIO_PORT = 9002,
  MINIO_USE_SSL = 0, //false
  MINIO_BUCKET = 'crawl-engine-image',
}
