import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqDocs } from '../../models/req_docs';

@Injectable({
  providedIn: 'root',
})
export class ReqDocsService {
  private API = 'http://localhost:8080/api/v1'; // URL base do backend

  constructor(private http: HttpClient) {}

  // Salvar um documento
  save(res: ReqDocs): Observable<ReqDocs> {
    console.log(res);
    const url = `${this.API}/upload`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'secret-key':
        'BvPHGM8C0ia4uOuxxqPD5DTbWC9F9TWvPStp3pb7ARo0oK2mJ3pd3YG4lxA9i8bj6OTbadwezxgeEByY',
    });
    return this.http.post<ReqDocs>(url, res, { headers });
  }

  // Buscar todos os documentos
  getDocuments(): Observable<any[]> {
    const url = `${this.API}/documents`;  // Endpoint que retorna todos os documentos
    return this.http.get<any[]>(url);
  }
  // Busca os documentos pelo id
  getDocumentById(id: number): Observable<any> {
    const url = `${this.API}/documents/${id}`;  // Endpoint para buscar documento completo
    return this.http.get<any>(url);
  }
  
  
}
