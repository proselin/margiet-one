import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComicEntity } from './comic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComicEntity])],
  exports: [TypeOrmModule],
})
export class ComicModule {}
