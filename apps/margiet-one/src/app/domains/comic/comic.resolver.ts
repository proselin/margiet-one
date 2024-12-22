import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ComicService } from './services/comic.service';
import { ComicPageableResponse } from './responses';
import { ComicPageableInput } from './dtos/comic-pageable.input';
import { Logger } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';

@Resolver()
export class ComicResolver {
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
    const queriedFields = info.fieldNodes[0].selectionSet.selections.map(
      (selection: any) => selection.name.value
    );
    Logger.log(queriedFields); // Exa
    return this.comicService.getComics(pageable);
  }
}
