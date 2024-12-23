import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ImageResolverService } from './services/image-resolver.service';
import { DriverUploadHistoryModel, ImageModel } from '../../../graphql';
import { ImageEntity } from '../../../entities';

@Resolver(() => ImageModel)
export class ImageResolver {
  constructor(private readonly imageService: ImageResolverService) {}

  @Query(() => [ImageModel], { name: 'imagesByChapter' })
  images(
    @Args('chapterId', {
      nullable: false,
      description: 'Id of chapter want to get images',
      type: () => Int,
    })
    chapterId: number
  ) {
    return this.imageService.getImagesByChapterId(chapterId);
  }

  @Query(() => ImageModel, { name: 'getImage' })
  image(@Args('imageId') imageId: number) {
    return this.imageService.getImage(imageId);
  }

  @ResolveField(() => DriverUploadHistoryModel, {
    nullable: true,
    name: 'minioUploadHistory',
  })
  getMinioUploadHistoryByImage(@Parent() image: ImageEntity) {
    return this.imageService.getMinioUploadHistoryByImage(image);
  }

  @ResolveField(() => String, {
    name: 'url',
  })
  preSignImageUrl(@Parent() image: ImageModel) {
    return image.url;
  }
}
