import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { CommonEntity } from '../../common';
import { DriverUploadHistoryEntity } from '../driver-upload-history';
import { MinioUploadHistoryEntity } from '../minio-upload-history';
import { ChapterEntity } from '../chapter';
import { ComicEntity } from '../comic';
import { MaybePromise } from '../../common/types/maybe';

@Entity('image')
export class ImageEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    length: 1000,
  })
  url: string;

  @Column({
    type: 'integer',
  })
  position: number;

  @Column({ type: 'simple-array', name: 'origin_urls' })
  originUrls: string[];

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.images)
  chapter: ChapterEntity;

  @OneToOne(() => DriverUploadHistoryEntity, {
    lazy: true,
  })
  @JoinColumn()
  driverUploadHistory: MaybePromise<DriverUploadHistoryEntity>;

  @OneToOne(() => MinioUploadHistoryEntity, {
    lazy: true,
  })
  @JoinColumn()
  minioUploadHistory: MaybePromise<MinioUploadHistoryEntity>;

  @OneToOne(() => ComicEntity)
  comic: ComicEntity;
}
