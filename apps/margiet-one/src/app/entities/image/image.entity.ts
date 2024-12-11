import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { CommonEntity } from '../../common';
import { DriverUploadHistory } from '../driver-upload-history';
import { MinioUploadHistory } from '../minio-upload-history';
import { ChapterEntity } from '../chapter';
import { ComicEntity } from '../comic';

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

  @OneToOne(() => DriverUploadHistory, {
    lazy: true,
  })
  driverUploadHistory: Promise<DriverUploadHistory>;

  @OneToOne(() => MinioUploadHistory, {
    lazy: true,
  })
  minioUploadHistory: Promise<MinioUploadHistory>;

  @ManyToOne(() => ChapterEntity, (chapter) => chapter.images)
  chapter: ChapterEntity;

  @OneToOne(() => ComicEntity)
  comic: ComicEntity;
}
