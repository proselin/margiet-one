import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';

import { MOApolloConfigProvider } from '@mw/libs/shared/graphql';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideApollo } from 'apollo-angular';
import { getAppConfigProvider } from '@mw/libs/shared/app-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideEffects(),
    getAppConfigProvider(environment),
    provideApollo(MOApolloConfigProvider),
  ],
};
