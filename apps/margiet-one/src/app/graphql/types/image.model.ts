import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BaseEntityGqlModel } from '../../common';
import { MinioUploadHistoryModel } from './minio-upload-history.model';
import { DriverUploadHistoryModel } from './driver-upload-history.model';

@ObjectType({
  description: 'Image model',
})
export class ImageModel extends BaseEntityGqlModel {
  @Field()
  url: string;

  @Field(() => Int)
  position: number;

  @Field(() => [String]) // List of strings
  originUrls: string[];

  @Field(() => DriverUploadHistoryModel, { nullable: true })
  driverUploadHistory?: DriverUploadHistoryModel;

  @Field(() => MinioUploadHistoryModel, { nullable: true })
  minioUploadHistory?: MinioUploadHistoryModel;
}
