import { registerAs } from '@nestjs/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvName, NODE_ENV } from '@/common';

export default registerAs('database', () => {
  return {
    type: 'postgres',
    url: process.env[EnvName.DATASOURCE_URI],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: process.env[EnvName.NODE_ENV] === NODE_ENV.DEVELOPMENT,
    logging: process.env[EnvName.NODE_ENV] === NODE_ENV.DEVELOPMENT,
    autoLoadEntities: true,
    retryDelay: 3000,
    retryAttempts: 3,
  } satisfies TypeOrmModuleOptions;
});
