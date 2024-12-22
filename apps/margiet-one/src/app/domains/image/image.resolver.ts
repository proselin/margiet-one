import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ImageModel } from '../../models';
import { ImageService } from './services/image.service';
import { Logger } from '@nestjs/common';

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}
  @Query(() => [ImageModel], { name: 'imagesByChapter' })
  images(
    @Args('chapterId', {
      nullable: false,
      description: 'Id of chapter want to get images',
      type: () => Int,
    })
    chapterId: number
  ) {
    Logger.log(chapterId);
    return [];
  }
}
