import { Field, InputType, Int } from '@nestjs/graphql';
import { DEFAULT_VALUE_PAGEABLE } from '../../constant/args';

@InputType()
export abstract class PageableInput {
  @Field(() => Int, {
    defaultValue: DEFAULT_VALUE_PAGEABLE.page,
    nullable: true,
  })
  page: number;

  @Field(() => Int, {
    defaultValue: DEFAULT_VALUE_PAGEABLE.limit,
    nullable: true,
  })
  limit: number;

  @Field(() => String, { nullable: true })
  sortBy?: string;

  @Field(() => String, {
    defaultValue: DEFAULT_VALUE_PAGEABLE.sortOrder,
    nullable: true,
  })
  sortOrder: 'ASC' | 'DESC';
}
