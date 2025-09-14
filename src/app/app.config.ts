// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading, withViewTransitions } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

// i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, `${environment.url}/i18n/`, '.json');
}

// Input file
import { InputFileConfig, InputFileModule } from './theme/components/input-file/input-file.module';
const inputFileConfig: InputFileConfig = { fileAccept: '*' };

// ⚠️ Mock API (solo si NO llamas a tu backend real)
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { UsersData } from './common/data/users-data';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withViewTransitions(),
      withPreloading(PreloadAllModules), // comenta esta línea si quieres lazy-loading puro
    ),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      InputFileModule.forRoot(inputFileConfig),
      // InMemoryWebApiModule.forRoot(UsersData, { passThruUnknownUrl: true, delay: 1000 }) // <- desactívalo si usas backend real
    ),
    { provide: OverlayContainer, useClass: CustomOverlayContainer }
  ]
};
