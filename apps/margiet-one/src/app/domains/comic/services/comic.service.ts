import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ComicEntity } from '../../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ComicPageableResponse } from '../responses';
import { ComicPageableInput } from '../dtos/comic-pageable.input';
import { Converter } from '../../../common/utils/helpers/converter';

interface IComicService {
  getComics(pageable: ComicPageableInput): Promise<ComicPageableResponse>;
}

@Injectable()
export class ComicService implements IComicService {
  constructor(
    @InjectRepository(ComicEntity)
    private comicRepository: Repository<ComicEntity>
  ) {}

  async getComics(
    pageable: ComicPageableInput
  ): Promise<ComicPageableResponse> {
    const { page, limit, sortBy, sortOrder } = pageable;
    const queryBuilder = this.comicRepository.createQueryBuilder('comic');

    // Apply sorting if `sortBy` and `sortOrder` are provided
    if (sortBy && sortOrder) {
      queryBuilder.orderBy(`comic.${sortBy}`, sortOrder);
    }

    // Apply pagination (skip = (page - 1) * limit)
    queryBuilder.skip((page - 1) * limit).take(limit);

    // Get the total count of users
    const [items, totalCount] = await queryBuilder.getManyAndCount();

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    return {
      items: items.map((e) => Converter.convertComicEntityToComicModel(e)),
      totalCount,
      totalPages,
      currentPage: page,
      limit,
    } satisfies ComicPageableResponse;
  }
}
