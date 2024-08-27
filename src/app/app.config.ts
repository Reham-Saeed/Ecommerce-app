import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
    provideRouter(routes,withHashLocation(),withViewTransitions()),
    provideHttpClient(),
  ]
};

