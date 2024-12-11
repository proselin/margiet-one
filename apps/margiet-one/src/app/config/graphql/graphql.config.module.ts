import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { EnvName, NODE_ENV } from '@/common';
import { GraphQLLogger } from '@/config/graphql/graphql-logger';
import { LoggingPlugin } from '@/config/graphql/plugins/logging.plugin';

type GraphQLModuleFactoryResult =
  | Promise<Omit<ApolloDriverConfig, 'driver'>>
  | Omit<ApolloDriverConfig, 'driver'>;


@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): GraphQLModuleFactoryResult => {

        return {
          playground: configService.get(EnvName.NODE_ENV) == NODE_ENV.DEVELOPMENT,
          // Using code fist method
          autoSchemaFile: true,
          installSubscriptionHandlers: true,
          plugins: [new LoggingPlugin()],
          logger: new GraphQLLogger(),
          subscriptions: {
            'graphql-ws': true
          },
          sortSchema: true,
        }
      }
    }),
  ]
})
export class GraphQLConfigModule {}
