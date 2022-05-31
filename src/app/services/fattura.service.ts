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
 return this.http.get<any>(`${this.baseUrl}/api/fatture/cliente/${id}?page=${page}&size=${size}`)
  }

  //post / put fattura

  setFattura(id:number,data:any){
    if (id==0){
return this.http.post(`${this.baseUrl}/api/fatture`,data)
    }else{
return  this.http.put(`${this.baseUrl}/api/fatture/${id}`,data)
    }
  }

  //elimina fattura
  deleteFattura(id:number){
  return this.http.delete(`${this.baseUrl}/api/fatture/${id}`)
  }

  //stato Fattura
  getStatiFattura(){
    return this.http.get<any>(`${this.baseUrl}/api/statifattura`)
  }

  getStatoFatturaById(id:number){

  }
}
