import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';  // Corrigindo as importações
import { environment } from '../../../environments/environment';
import { Usuario } from '../../auth/usuario';  // Corrigindo a importação da model

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly API = environment.API_URI + 'usuario';

  constructor(private http: HttpClient) {}  // Usando injeção através do construtor

  // Método para buscar o usuário pelo 'document'
  findUserByDocument(document: string): Observable<Usuario> {  // Ajuste no tipo para retornar um único usuário
    return this.http.get<Usuario>(`${this.API}/findByDocument/${document}`).pipe(
      catchError((error) => {
        // Melhor forma de tratar erro, retornando uma mensagem personalizada
        return throwError(() => new Error(error.error || 'Erro ao buscar usuário'));
      })
    );
  }

  handleRegister(res: Usuario, role: number): Observable<string> {
    const registerData: Usuario = {
      name: res.name,
      document: res.document,
      email: res.email,
      password: res.password,
      gender: res.gender,
      date_born: res.date_born,
      role,
      created_at: new Date(),
      updated_at: new Date(),
      protocols: []
    };

    return this.http
      .post<string>(`${this.API}/save`, registerData, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((error) => {
          // Tratamento de erro simplificado
          return throwError(() => new Error(error.error || 'Erro ao registrar usuário'));
        })
      );
  }
}
