import { Module } from '@nestjs/common';
import { DriverUploadHistory } from './index';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DriverUploadHistory])],
  exports: [TypeOrmModule],
})
export class DriverUploadHistoryModule {}
