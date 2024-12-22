import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { CommonEntity } from '../../common';
import { ChapterEntity } from '../chapter';
import { ImageEntity } from '../image';
import { MaybePromise } from '../../common/types/maybe';

@Entity('comic')
export class ComicEntity extends CommonEntity {
  @Column()
  title: string;

  @Column({
    name: 'chapter_count',
    type: 'integer',
  })
  chapterCount: number;

  @Column({
    nullable: true,
  })
  status: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    name: 'origin_url',
  })
  originUrl: string;

  @Column({
    type: 'simple-array',
    name: 'url_history',
    nullable: true,
  })
  urlHistory: string[];

  @Column({
    name: 'should_refresh',
    type: 'boolean',
    default: false,
  })
  shouldRefresh: boolean;

  @Column({
    type: 'simple-array',
    default: [],
  })
  tags: string[];

  @Column({
    type: 'varchar',
    default: [],
  })
  author: string;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.comic, {
    lazy: true,
  })
  chapters: MaybePromise<ChapterEntity[]>;

  @OneToOne(() => ImageEntity, {
    lazy: true,
  })
  thumbImage: MaybePromise<ImageEntity>;
}
