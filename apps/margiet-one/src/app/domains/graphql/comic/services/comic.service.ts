import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ComicPageableInput } from '../dtos/comic-pageable.input';
import { ComicPageableResponse } from '../responses';
import { InjectRepository } from '@nestjs/typeorm';
import { ComicEntity } from '../../../../entities';
import { ComicModel } from '../../../../graphql';

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
      items: items as ComicModel[],
      totalCount,
      totalPages,
      currentPage: page,
      limit,
    } satisfies ComicPageableResponse;
  }
}
