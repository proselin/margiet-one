import { AppConfig } from './app-config.type';
import { InjectionToken, ValueProvider } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>(
  'web-margiet-whale.config'
);

export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: value,
});
