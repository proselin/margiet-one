import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ComicService } from './services/comic.service';
import { ComicPageableResponse } from './responses';
import { ComicPageableInput } from './dtos/comic-pageable.input';
import { Logger } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { WithLogger } from '../../../common/decorators';
import { ComicModel } from '../../../graphql';

@Resolver(() => ComicModel)
@WithLogger()
export class ComicResolver {
  private logger: Logger;

  constructor(private comicService: ComicService) {}

  @Query(() => ComicPageableResponse, {
    name: 'pageableComics',
  })
  comics(
    @Args({
      name: 'pageable',
      type: () => ComicPageableInput,
      nullable: false,
    })
    pageable: ComicPageableInput,
    @Info() info: GraphQLResolveInfo
  ): Promise<ComicPageableResponse> {
    return this.comicService.getComics(pageable);
  }
}
