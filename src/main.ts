import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {
  cachingInterceptor,
  loggingInterceptor,
  RequestInterceptor,
} from './app/auth/RequestInterceptor';
import { Observable, tap } from 'rxjs';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, ReactiveFormsModule),
    provideHttpClient(
      withInterceptors([loggingInterceptor, cachingInterceptor]),
    ),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
}).catch((err) => console.error(err));
