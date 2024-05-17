import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public saveToSessionStorage(token: string, name: string): void {
    sessionStorage.setItem(name, token);
  }

  public getFromSessionStorage(name: string): string | null {
    return sessionStorage.getItem(name);
  }

  public deleteFromSessionStorage(name: string): void {
    sessionStorage.removeItem(name);
  }

  public clearSession(): void {
    sessionStorage.clear();
  }

}
