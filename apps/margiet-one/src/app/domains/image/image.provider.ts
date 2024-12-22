import { Provider } from '@nestjs/common';
import { ImageService } from './services/image.service';

export const imageProviders: Provider[] = [ImageService];
