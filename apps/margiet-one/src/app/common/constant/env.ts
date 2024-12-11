export const enum EnvName {
  //=============== Server ==================
  NODE_ENV = 'NODE_ENV',
  SERVER_HOST = 'SERVER_HOST',
  SERVER_PORT = 'SERVER_PORT',
  SERVER_PREFIX = 'SERVER_PREFIX',

  //=============== Redis ==================
  REDIS_HOST = 'REDIS_HOST',
  REDIS_PORT = 'REDIS_PORT',
  REDIS_USERNAME = 'REDIS_USERNAME',
  REDIS_PASSWORD = 'REDIS_PASSWORD',

  //=============== Database ==================
  DATASOURCE_URI = 'DATASOURCE_URI',

  //=============== Minio ==================
  MINIO_ENDPOINT = 'MINIO_ENDPOINT',
  MINIO_PORT = 'MINIO_PORT',
  MINIO_USE_SSL = 'MINIO_USE_SSL',
  MINIO_ACCESS_KEY = 'MINIO_ACCESS_KEY',
  MINIO_SECRET_KEY = 'MINIO_SECRET_KEY',
  MINIO_BUCKET = 'MINIO_BUCKET',

  //=============== Swagger ==================
  SERVER_API_DOCUMENT_PREFIX = 'swagger',
}
