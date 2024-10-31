import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reqCamp } from '../models/req_camps';

@Injectable({
  providedIn: 'root',
})
export class ReqCampService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api/v1/req_camp';

  constructor() {}

  save(res: reqCamp): Observable<reqCamp> {
    const requerimentoInfo = res;
    const url = `${this.API}/`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'secret-key':
        'BvPHGM8C0ia4uOuxxqPD5DTbWC9F9TWvPStp3pb7ARo0oK2mJ3pd3YG4lxA9i8bj6OTbadwezxgeEByY',
    });
    console.log(requerimentoInfo)
    return this.http.post<reqCamp>(url, requerimentoInfo, { headers });
  }
}
