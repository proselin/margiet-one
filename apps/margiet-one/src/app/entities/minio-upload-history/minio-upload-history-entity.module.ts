import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MinioUploadHistoryEntity } from './minio-upload-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MinioUploadHistoryEntity])],
  exports: [TypeOrmModule],
})
export class MinioUploadHistoryEntityModule {}
