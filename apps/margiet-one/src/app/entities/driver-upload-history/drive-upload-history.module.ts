import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriverUploadHistory } from './drive-upload-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverUploadHistory])],
  exports: [TypeOrmModule],
})
export class DriverUploadHistoryModule {}
