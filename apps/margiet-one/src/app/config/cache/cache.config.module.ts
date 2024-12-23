import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { CacheOptions } from '@nestjs/cache-manager/dist/interfaces/cache-module.interface';
import { EnvName } from '../../common';
import KeyvRedis, { Keyv, RedisClientOptions } from '@keyv/redis';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisConfig: RedisClientOptions = {
          url: `redis://${configService.getOrThrow(
            EnvName.REDIS_HOST
          )}:${configService.getOrThrow(EnvName.REDIS_PORT)}`,
          password: configService.get(EnvName.REDIS_PASSWORD),
          username: configService.get(EnvName.REDIS_USERNAME),
        };

        const keyv = new Keyv({
          store: new KeyvRedis(redisConfig),
          ttl: configService.getOrThrow(EnvName.CACHE_TTL),
        });

        return {
          store: keyv.store,
          ttl: configService.getOrThrow(EnvName.CACHE_TTL),
          max: configService.getOrThrow(EnvName.CACHE_MAX),
          refreshThreshold: configService.getOrThrow(
            EnvName.CACHE_REFRESH_THRESHOLD
          ),
        } satisfies CacheOptions;
      },
    }),
  ],
})
export class CacheConfigModule {}
