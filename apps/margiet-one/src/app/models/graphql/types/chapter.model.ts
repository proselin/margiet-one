import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntityGqlModel } from '../../../common';
import { ComicModel } from './comic.model';
import { ImageModel } from './image.model';

@ObjectType({ description: 'Chapter model' })
export class ChapterModel extends BaseEntityGqlModel {
  @Field(() => String)
  chapterNumber: string;

  @Field(() => String)
  sourceUrl: string;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  position: number;

  @Field(() => ComicModel)
  comic: ComicModel;

  @Field(() => [ImageModel])
  images: ImageModel[];
}
