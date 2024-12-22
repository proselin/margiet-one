import { Module } from '@nestjs/common';
import { HealthModule } from './health';
import { ChapterDomainModule } from './chapter/chapter.domain.module';
import { ComicDomainModule } from './comic/comic.domain.module';
import { ImageDomainModule } from './image/image.domain.module';

@Module({
  imports: [
    HealthModule,
    ChapterDomainModule,
    ComicDomainModule,
    ImageDomainModule,
  ],
})
export class DomainsModule {}
