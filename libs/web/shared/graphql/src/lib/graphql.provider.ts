import { inject } from '@angular/core';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { APP_CONFIG } from '@mw/libs/shared/app-config';
import { HttpLink } from 'apollo-angular/http';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // React only on graphql errors
  if (graphQLErrors && graphQLErrors.length > 0) {
    // if (
    //   (graphQLErrors[0])?.statusCode >= 400 &&
    //   (graphQLErrors[0])?.statusCode < 500
    // ) {
    //   // handle client side error
    //   console.error(`[Client side error]: ${graphQLErrors[0].message}`);
    // } else {
    //   // handle server side error
    //   console.error(`[Server side error]: ${graphQLErrors[0].message}`);
    // }
  }
  if (networkError) {
    // handle network error
    console.error(`[Network error]: ${networkError.message}`);
  }
});

const basicContext = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Accept: 'charset=utf-8',
      authorization: `Bearer random token`,
      'Content-Type': 'application/json',
    },
  };
});

export const MOApolloConfigProvider = () => {
  const cache = new InMemoryCache({});
  const httpLink = inject(HttpLink);
  const config = inject(APP_CONFIG);

  const http = httpLink.create({
    uri: config.graphqlURL,
  });

  return {
    devtools: {
      enabled: !config.production,
    },
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from([basicContext, errorLink, http]),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  } satisfies ApolloClientOptions<NormalizedCacheObject>;
};
