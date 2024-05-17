import { inject } from '@angular/core';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { SPOTIFY_TOKEN } from '../constants';

export const tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const accessToken = inject(TokenStorageService).getFromSessionStorage(SPOTIFY_TOKEN);
  const authRequest = request.clone({
    headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
  });
  return next(authRequest);
}
