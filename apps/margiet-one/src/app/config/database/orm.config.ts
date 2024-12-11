
import { DataSourceOptions } from 'typeorm';
import { EnvName, NODE_ENV } from '@/common';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env[EnvName.DATASOURCE_URI],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env[EnvName.NODE_ENV] === NODE_ENV.DEVELOPMENT,
  logging: process.env[EnvName.NODE_ENV] === NODE_ENV.DEVELOPMENT,
  migrations: [__dirname + '/config/migrations/**/*{.ts,.js}'],
  migrationsRun: true,
  logger: 'file',
};

export default ormConfig;
