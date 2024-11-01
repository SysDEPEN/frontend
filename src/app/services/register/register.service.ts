import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly API = 'http://localhost:8080/api/v1/users';
  private http = inject(HttpClient);

  constructor() {}

  handleRegister(
    name: string,
    document: string,
    email: string,
    password: string,
    data_birth: string,
    gender: string
  ): Observable<any> {
    const role: number = 0;
    const registerData = {
      name,
      document,
      email,
      password,
      gender,
      data_birth,
      role,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.API}/save`, registerData, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error.error);
      })
    );
  }
}
