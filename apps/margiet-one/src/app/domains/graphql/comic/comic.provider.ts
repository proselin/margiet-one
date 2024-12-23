import { Provider } from '@nestjs/common';
import { ComicResolver } from './comic.resolver';
import { ComicService } from './services/comic.service';

export const comicProviders: Provider[] = [ComicResolver, ComicService];
