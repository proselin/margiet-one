import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

import { EnvName, NODE_ENV } from '../../common';
import { DEFAULT_CACHE_CONFIG } from '../../common/constant/cache';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    url: process.env[EnvName.DATASOURCE_URI],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: process.env[EnvName.NODE_ENV] === NODE_ENV.DEVELOPMENT,
    autoLoadEntities: true,
    retryDelay: 3000,
    retryAttempts: 3,
    cache: {
      duration: DEFAULT_CACHE_CONFIG.ONE_DAY,
      type: 'redis',
      options: {
        socket: {
          host: process.env[EnvName.REDIS_HOST],
          port: process.env[EnvName.REDIS_PORT],
        },
      },
    },
  } satisfies TypeOrmModuleOptions;
});
