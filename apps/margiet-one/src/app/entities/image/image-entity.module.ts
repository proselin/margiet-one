import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MinioUploadHistoryEntity,
  MinioUploadHistoryEntityModule,
} from '../minio-upload-history';
import { ImageEntity } from './image.entity';
import {
  DriverUploadHistoryEntity,
  DriverUploadHistoryEntityModule,
} from '../driver-upload-history';

@Module({
  imports: [
    DriverUploadHistoryEntityModule,
    MinioUploadHistoryEntityModule,
    TypeOrmModule.forFeature([
      ImageEntity,
      MinioUploadHistoryEntity,
      DriverUploadHistoryEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ImageEntityModule {}
