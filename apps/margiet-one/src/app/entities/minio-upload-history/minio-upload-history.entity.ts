import { Column, Entity, OneToOne } from 'typeorm';
import { CommonEntity } from '../../common';
import { ImageEntity } from '../image';


@Entity('minio-upload-history')
export class MinioUploadHistory extends CommonEntity {
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
  image: Promise<ImageEntity>;
}
