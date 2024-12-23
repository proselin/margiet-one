import { Field, ObjectType } from '@nestjs/graphql';

import { BaseEntityGqlModel } from '../../common';
import { ImageModel } from './image.model';

@ObjectType()
export class DriverUploadHistoryModel extends BaseEntityGqlModel {
  @Field()
  driverId: string;

  @Field()
  fileName: string;

  @Field()
  parentFolderId: string;

  @Field()
  url: string;

  @Field(() => ImageModel, { nullable: true })
  image?: ImageModel;
}
