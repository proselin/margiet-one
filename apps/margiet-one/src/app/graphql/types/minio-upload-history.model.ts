import { Field, ObjectType } from '@nestjs/graphql';
import { ImageModel } from './image.model';
import { BaseEntityGqlModel } from '../../common';

@ObjectType()
export class MinioUploadHistoryModel extends BaseEntityGqlModel {
  @Field({ nullable: true })
  bucketName?: string;

  @Field({ nullable: true })
  fileName?: string;

  @Field({ nullable: true })
  url?: string;

  @Field(() => ImageModel, { nullable: true })
  image?: ImageModel;
}
