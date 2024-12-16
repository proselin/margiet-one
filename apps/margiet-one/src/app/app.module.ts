import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  DatabaseConfigModule,
  envValidation,
  LoggerConfigModule,
} from './config';
import databaseConfig from './config/database/database.config';
import redisConfig from './config/redis.config';
import { GraphQLConfigModule } from './config/graphql/graphql.config.module';
import { LoggingInterceptor, TimeoutInterceptor } from './intercept';
import { CsrfMiddleware } from './middlewares/double-csrf/double-csrf.middleware';
import { HealthModule } from './modules/health';
import { FeatureModule } from './modules/feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidation,
      load: [redisConfig, databaseConfig],
    }),
    LoggerConfigModule,
    DatabaseConfigModule,
    FeatureModule,
    HealthModule,
    GraphQLConfigModule,
  ],
  providers: [TimeoutInterceptor, LoggingInterceptor, CsrfMiddleware],
})
export class AppModule {}
