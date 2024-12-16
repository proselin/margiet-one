import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MinioUploadHistory } from './minio-upload-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MinioUploadHistory])],
  exports: [TypeOrmModule],
})
export class MinioUploadHistoryModule {}
