import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GraphQLLogger } from './graphql-logger';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

type GraphQLModuleFactoryResult =
  | Promise<Omit<ApolloDriverConfig, 'driver'>>
  | Omit<ApolloDriverConfig, 'driver'>;

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (): GraphQLModuleFactoryResult => {
        return {
          playground: false,
          autoSchemaFile: 'apps/margiet-one/margiet-one.schema.graphql',
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          installSubscriptionHandlers: true,
          logger: new GraphQLLogger(),
          subscriptions: {
            'graphql-ws': true,
          },
          sortSchema: true,
          autoTransformHttpErrors: true,
        };
      },
    }),
  ],
})
export class GraphQLConfigModule {}
