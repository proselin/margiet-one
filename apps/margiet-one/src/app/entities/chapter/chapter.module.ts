import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChapterEntity } from './chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChapterEntity])],
  exports: [TypeOrmModule],
})
export class ChapterModule {}
