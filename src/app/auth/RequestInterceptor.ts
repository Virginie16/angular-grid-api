import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpEventType,
  HttpContextToken,
} from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Http response headers : ', event.headers);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error ', error);
        return throwError(error);
      }),
    );
  }
}
export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
  );
}
export const CACHING_ENABLED = new HttpContextToken<boolean>(() => true);
const cache = new Map<string, HttpResponse<any>>();
export function cachingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  if (req.context.get(CACHING_ENABLED)) {
    const cachedResponse = cache.get(req.urlWithParams);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    } else {
      return next(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            cache.set(req.urlWithParams, event.clone());
          }
        }),
      );
    }
  } else {
    // caching has been disabled for this request
    return next(req);
  }
}
