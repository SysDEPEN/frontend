//https://servicodados.ibge.gov.br/api/v1/localidades/estados

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IBGEUFResponse } from "../models/IBGEUF";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class IBGEService {
  http = inject(HttpClient)

  API = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

  constructor() { }


  listAllUFs(): Observable<IBGEUFResponse[]> {
    return this.http.get<IBGEUFResponse[]>(this.API);
  }
}
