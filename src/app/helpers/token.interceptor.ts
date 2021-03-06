import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { SPOTIFY_TOKEN } from '../constants';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenStorageService.getFromSessionStorage(SPOTIFY_TOKEN);
    return next.handle(request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    }));
  }
}
