import { Provider } from '@nestjs/common';
import { ChapterService } from './services/chapter.service';
import { ChapterResolver } from './chapter.resolver';

export const chapterProvider: Provider[] = [ChapterService, ChapterResolver];
