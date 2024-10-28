import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/v1/logins"

  constructor() { }

  handleLogin(login: Login): Observable<string> {
    return this.http.post<string> (this.API+"/login")
  }
}
