// protocol.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Protocol {
  id: number;
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  private apiUrl = 'http://localhost:8080/api/v1/protocols';

  constructor(private http: HttpClient) {}

  getProtocolById(id: number): Observable<Protocol> {
    return this.http.get<Protocol>(`${this.apiUrl}/${id}`);
  }
}
