import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '../../../../entities';
import { Repository } from 'typeorm';

interface IImageService {
  preSignDownloadImage(): void;
  getImage(imageId: number): Promise<ImageEntity>;
  getMinioUploadHistoryByImage(
    image: ImageEntity
  ): ImageEntity['minioUploadHistory'];
}

@Injectable()
export class ImageResolverService implements IImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>
  ) {}

  preSignDownloadImage() {
    return void 0;
  }

  public getImagesByChapterId(chapterId: number): Promise<ImageEntity[]> {
    return this.imageRepository.findBy({
      chapter: {
        id: chapterId,
      },
    });
  }

  public getImage(imageId: number): Promise<ImageEntity> {
    return this.imageRepository.findOneByOrFail({ id: imageId });
  }

  getMinioUploadHistoryByImage(image: ImageEntity) {
    return image.minioUploadHistory;
  }
}
