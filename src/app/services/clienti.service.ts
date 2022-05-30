import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientiService {
  baseUrl = environment.urlApi;
  constructor(private http: HttpClient) {}

  getClients(page: number, size: number) {
    return this.http.get<any>(
      `${this.baseUrl}/api/clienti?page=${page}&size=${size}`
    );
  }

  setCliente(data:any,id:number){
   if(id!=0){
     return this.http.put(`${this.baseUrl}/api/clienti/${id}`,data)
   }
  console.log(data)
    return this.http.post(
      `${this.baseUrl}/api/clienti`,data
    )
  }
  getTipoCliente() {
    return this.http.get(`${this.baseUrl}/api/clienti/tipicliente`);
  }
  getClientById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/api/clienti/${id}`);
  }
  deleteClients(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/api/clienti/${id}`);
  }
}
