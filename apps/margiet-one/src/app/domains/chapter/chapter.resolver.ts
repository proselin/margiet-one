import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChapterModel } from '../../models';
import { ChapterService } from './services/chapter.service';

@Resolver()
export class ChapterResolver {
  constructor(private chapterService: ChapterService) {}

  @Query(() => [ChapterModel], { name: 'chaptersByComicId' })
  chapters(@Args('comicId') comicId: number) {
    return this.chapterService.getChaptersByComicId(comicId);
  }

  @Query(() => ChapterModel, { name: 'chapterById' })
  chapter(@Args('chapterId') chapterId: number) {
    return this.chapterService.getChapterById(chapterId);
  }
}
