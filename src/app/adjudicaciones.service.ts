import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdjudicacionesService {

  constructor(
    private http : HttpClient
  ) { }

  async searchAdjudicaciones(numero : string): Promise<any>{
    const url = `https://localhost:7164/Adjudicaciones?numero=${numero}`;
    return await this.http.get<any>(url).toPromise();
  }
}
