import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/v1/"

  constructor() { }

  registerData!: {
    username: string,
    document: string,
    email: string,
    password: string
  };

  handleRegister(registerData: any): Observable<any> {
    const register = new registerData;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return
  }
}
