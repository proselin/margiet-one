import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  DatabaseConfigModule,
  envValidation,
  LoggerConfigModule,
} from './config';

import redisConfig from './config/redis.config';
import { GraphQLConfigModule } from './config/graphql/graphql.config.module';
import { LoggingInterceptor, TimeoutInterceptor } from './intercept';
import { CsrfMiddleware } from './middlewares/double-csrf';
import { DomainsModule } from './domains/domains.module';
import databaseConfig from './config/database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidation,
      load: [redisConfig, databaseConfig],
    }),
    LoggerConfigModule,
    DatabaseConfigModule,
    DomainsModule,
    GraphQLConfigModule,
  ],
  providers: [TimeoutInterceptor, LoggingInterceptor, CsrfMiddleware],
})
export class AppModule {}
