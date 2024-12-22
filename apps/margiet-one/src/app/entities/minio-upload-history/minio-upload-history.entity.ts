import { Column, Entity, OneToOne } from 'typeorm';

import { CommonEntity } from '../../common';
import { ImageEntity } from '../image';
import { MaybePromise } from '../../common/types/maybe';

@Entity('minio-upload-history')
export class MinioUploadHistoryEntity extends CommonEntity {
  @Column({
    nullable: true,
  })
  bucketName: string;

  @Column({
    nullable: true,
  })
  fileName: string;

  @Column({
    nullable: true,
  })
  url: string;

  @OneToOne(() => ImageEntity, (img) => img.minioUploadHistory, {
    lazy: true,
  })
  image: MaybePromise<ImageEntity>;
}
