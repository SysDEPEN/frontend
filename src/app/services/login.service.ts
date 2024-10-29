import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/v1/logins"
  document: any;
  password: any;

  constructor() { }

  handleLogin(document: string, password: string): Observable<any> {
    const login = { document, password }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'secret-key': 'sua_secret_key_aqui' // Insira a chave aqui
    });

    return this.http.post<any>(`${this.API}/login`, login, { headers });
  }
}
