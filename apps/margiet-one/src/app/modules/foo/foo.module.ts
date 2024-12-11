import { Module } from '@nestjs/common';
import { RecipesResolver } from '@/modules/foo/foo.resolver';
import { RecipesService } from '@/modules/foo/foo.service';

@Module({
  providers: [RecipesResolver, RecipesService,]
})
export class FooModule {}
