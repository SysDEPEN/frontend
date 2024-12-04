import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { reqCamp } from '../models/req_camps';

@Injectable({
  providedIn: 'root',
})
export class ReqCampService {
  http = inject(HttpClient);
  API = environment.API_URI + 'req_camp';

  constructor() { }

  save(res: reqCamp): Observable<reqCamp> {
    const url = `${this.API}/save`;


    return this.http.post<reqCamp>(url, res);
  }
}
