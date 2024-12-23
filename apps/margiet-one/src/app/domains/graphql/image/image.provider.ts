import { Provider } from '@nestjs/common';
import { ImageResolverService } from './services/image-resolver.service';
import { ImageResolver } from './image.resolver';

export const imageProviders: Provider[] = [ImageResolverService, ImageResolver];
