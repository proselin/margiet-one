import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(
    requestContext
  ): Promise<GraphQLRequestListener<unknown>> {
    Logger.log(`GraphQL request started`, 'LoggingPlugin');
    Logger.debug(requestContext, 'LoggingPlugin');
    return {
      async willSendResponse(requestContext)   {
        Logger.log(`GraphQL request end`, 'LoggingPlugin');
        Logger.debug(requestContext, 'LoggingPlugin');
      },
    };
  }
}
