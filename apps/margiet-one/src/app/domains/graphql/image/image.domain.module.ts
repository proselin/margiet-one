import { Module } from '@nestjs/common';
import { ImageEntityModule } from '../../../entities';
import { imageProviders } from './image.provider';

@Module({
  imports: [ImageEntityModule],
  providers: imageProviders,
})
export class ImageDomainModule {}
