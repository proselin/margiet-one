import { Module } from '@nestjs/common';
import databaseConfig from '@/config/database/database.config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule, envValidation, LoggerConfigModule } from '@/config';
import redisConfig from '@/config/redis.config';
import { GraphQLConfigModule } from '@/config/graphql/graphql.config.module';
import { FooModule } from '@/modules/foo/foo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidation,
      load: [redisConfig, databaseConfig],
    }),
    LoggerConfigModule,
    DatabaseConfigModule,
    FooModule,
    GraphQLConfigModule
  ],
})
export class AppModule {}
