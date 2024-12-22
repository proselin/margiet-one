import { Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {

  @Query(() => Float)
  uptime() {
    return process.uptime();
  }
}
