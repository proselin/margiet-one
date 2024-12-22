import { Module } from '@nestjs/common';
import { chapterProvider } from './chapter.provider';
import { ChapterEntityModule } from '../../entities';

@Module({
  imports: [ChapterEntityModule],
  providers: chapterProvider,
  exports: [],
})
export class ChapterDomainModule {}
