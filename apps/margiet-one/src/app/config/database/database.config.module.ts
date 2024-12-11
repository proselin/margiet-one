import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '@/config/database/database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(databaseConfig.asProvider())],
  exports: [TypeOrmModule],
})
export class DatabaseConfigModule {}
