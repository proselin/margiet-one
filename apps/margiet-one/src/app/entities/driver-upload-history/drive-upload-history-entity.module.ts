import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriverUploadHistoryEntity } from './drive-upload-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverUploadHistoryEntity])],
  exports: [TypeOrmModule],
})
export class DriverUploadHistoryEntityModule {}
