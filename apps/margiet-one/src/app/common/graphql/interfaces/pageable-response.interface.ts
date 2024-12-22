import { Field, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export class IPageableResponse<T = unknown> {
  @Field(() => void 0 as [T])
  items: T[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  limit: number;
}
