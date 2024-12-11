import { Column, Entity, OneToOne } from 'typeorm';
import { CommonEntity } from '../../common';
import { ImageEntity } from '../image';

@Entity('drive-upload-history')
export class DriverUploadHistory extends CommonEntity {
  @Column({
    name: 'drive-id',
  })
  driverId: string;

  @Column({
    name: 'file-name',
  })
  fileName: string;

  @Column({
    name: 'parent-folder-id',
  })
  parentFolderId: string;

  @Column()
  url: string;

  @OneToOne(() => ImageEntity, (img) => img.driverUploadHistory, {
    lazy: true,
  })
  image: Promise<ImageEntity>;
}
