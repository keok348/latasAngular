import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface UserResponse {
  id: number;
  nombre: string;
  email: string;
  createdAt: string;
  enabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = '/api/auth'; // ajusta proxy o environment si procede

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<{ token?: string; user: UserResponse }> {
    return this.http.post<{ token?: string; user: UserResponse }>(`${this.baseUrl}/login`, data)
      .pipe(tap(res => {
        if (res?.token) localStorage.setItem('auth_token', res.token);
      }));
  }
}
