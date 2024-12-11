import { Module } from '@nestjs/common';
import {
  DriverUploadHistory,
  DriverUploadHistoryModule,
} from '../driver-upload-history';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MinioUploadHistory,
  MinioUploadHistoryModule,
} from '../minio-upload-history';
import { ImageEntity} from './image.entity';


@Module({
  imports: [
    DriverUploadHistoryModule,
    MinioUploadHistoryModule,
    TypeOrmModule.forFeature([
      ImageEntity,
      MinioUploadHistory,
      DriverUploadHistory,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ImageModule {}