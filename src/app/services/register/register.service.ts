import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Register } from '../../models/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly API = 'http://localhost:8080/api/v1/users';
  private http = inject(HttpClient);

  constructor() { }

  handleRegister(res: Register): Observable<Register> {
    const role: number = 0;
    const registerData: Register = {
      name: res.name,
      document: res.document,
      email: res.email,
      password: res.password,
      gender: res.gender,
      data_birth: res.data_birth,
      role,
      created_at: new Date,
      updated_at: new Date,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'secret-key':
        'BvPHGM8C0ia4uOuxxqPD5DTbWC9F9TWvPStp3pb7ARo0oK2mJ3pd3YG4lxA9i8bj6OTbadwezxgeEByY',
    });
    return this.http.post<Register>(`${this.API}/save`, registerData, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error.error);
      })
    );
  }
}
