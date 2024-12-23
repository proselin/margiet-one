import { Module } from '@nestjs/common';
import { ComicEntityModule } from '../../../entities';
import { comicProviders } from './comic.provider';

@Module({
  imports: [ComicEntityModule],
  providers: comicProviders,
})
export class ComicDomainModule {}
