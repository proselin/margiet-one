import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IPageableResponse } from '../../../../common';
import { ComicModel } from '../../../../graphql';

@ObjectType()
export class ComicPageableResponse implements IPageableResponse<ComicModel> {
  @Field(() => [ComicModel])
  items: ComicModel[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  limit: number;
}
