import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestMinioModule } from '@margiet-libs/minio';
import { EnvName } from '@/common';

@Module({
  imports: [
    NestMinioModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          endPoint: configService.get(EnvName.MINIO_ENDPOINT),
          useSSL: configService.get(EnvName.MINIO_USE_SSL),
          port: +configService.get(EnvName.MINIO_PORT),
          accessKey: configService.get(EnvName.MINIO_ACCESS_KEY, null),
          secretKey: configService.get(EnvName.MINIO_SECRET_KEY, null),
        };
      },
    }),
  ],
})
export class MinioConfigModule {}