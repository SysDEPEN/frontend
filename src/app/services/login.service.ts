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

  handleLogin(document:string, password:string): Observable<any> {
    const loginData = {document, password}
    return this.http.post<any>(`${this.API}/login`, loginData, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }
}
