import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ImageModel } from './image.model';
import { ChapterModel } from './chapter.model';

@ObjectType({
  description: 'Comic Model',
})
export class ComicModel {
  @Field(() => String)
  title: string;

  @Field(() => Int)
  chapterCount: number;

  @Field(() => String, { nullable: true })
  status: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  originUrl: string;

  @Field(() => [String])
  urlHistory: string[];

  @Field(() => String, { nullable: true })
  shouldRefresh: boolean;

  @Field(() => [String])
  tags: string[];

  @Field(() => String, { nullable: true })
  author: string;

  @Field(() => [ChapterModel])
  chapters: ChapterModel[];

  @Field(() => ImageModel)
  thumbImage: ImageModel;
}
