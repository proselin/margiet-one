import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChapterEntity } from '../../../../entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(ChapterEntity)
    private chapterRepository: Repository<ChapterEntity>
  ) {}

  public async getChaptersByComicId(comicId: number): Promise<ChapterEntity[]> {
    return this.chapterRepository.findBy({
      comic: {
        id: comicId,
      },
    });
  }

  public async getChapterById(chapterId: number): Promise<ChapterEntity> {
    return this.chapterRepository.findOneByOrFail({
      id: chapterId,
    });
  }
}
