import { ApolloServerPlugin, GraphQLRequestContext } from '@apollo/server';
import { Logger } from '@nestjs/common';
import { EnvName, NODE_ENV } from '../../common';

export class GraphqlLoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(requestContext: GraphQLRequestContext<unknown>) {
    if (process.env[EnvName.NODE_ENV] == NODE_ENV.DEVELOPMENT) {
      Logger.log(
        `GraphQL Request:`,
        GraphqlLoggingPlugin.name,
        requestContext.request.query
      );
      Logger.log(`Variables:`, GraphqlLoggingPlugin.name, {
        variables: requestContext.request.variables,
      });

      return {
        async willSendResponse(responseContext) {
          Logger.log(
            `GraphQL Response:`,
            GraphqlLoggingPlugin.name,
            responseContext.response.data
          );
          if (responseContext.response.errors) {
            Logger.error(
              `Errors in ${responseContext.request.operationName}:`,
              GraphqlLoggingPlugin.name,
              responseContext.response.errors
            );
          }
        },
      };
    }
    return {};
  }
}
