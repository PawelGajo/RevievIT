import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { Credentials, User } from '../models/user.model';

export interface Token {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  API_URL = env.apiUrl;
  currentUser$ =new BehaviorSubject<User | null>(null);

  login(credentials: Credentials) {
    this.http.post<Token>(`${this.API_URL}auth/login`, credentials)
    .pipe(
      tap(token => this.setToken(token.access_token)),
      ).subscribe(
      {
        complete: () =>this.router.navigate(['posts'])
      }
    );
  }

  logout() {
    localStorage.removeItem('Token');
    this.router.navigate(['auth', 'login']);
  }

  setToken(token: string) {
    localStorage.setItem('Token', token);
  }

  isLogged() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('Token');
  }
}
