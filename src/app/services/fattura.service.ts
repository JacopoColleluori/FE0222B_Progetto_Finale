import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FatturaService {
baseUrl=environment.urlApi;
  constructor(private http:HttpClient) { }

  getAllFatture(page:number,size:number){
 return this.http.get<any>(`${this.baseUrl}/api/fatture?page=${page}&size=${size}`)
  }
  getFattureById(id:number){
    return this.http.get<any>(`${this.baseUrl}/api/fatture/${id}`)
  }
  getFattureByCliente(id:number,page:number,size:number){
 return this.http.get<any>(`${this.baseUrl}/api/fatture/cliente/${id}?page=${page}&size=${size}&sort=state`)
  }
}
