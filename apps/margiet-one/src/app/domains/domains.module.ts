import { Module } from '@nestjs/common';
import { HealthModule } from './graphql/health';
import { ChapterDomainModule } from './graphql/chapter/chapter.domain.module';
import { ComicDomainModule } from './graphql/comic/comic.domain.module';
import { ImageDomainModule } from './graphql/image/image.domain.module';

@Module({
  imports: [
    HealthModule,
    ChapterDomainModule,
    ComicDomainModule,
    ImageDomainModule,
  ],
})
export class DomainsModule {}
