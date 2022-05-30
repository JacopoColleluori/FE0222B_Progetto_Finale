import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComuneService {
 baseUrl=environment.urlApi;
  constructor(private http:HttpClient) { }

  getComuni(){
return this.http.get<any>(`${this.baseUrl}/api/comuni`)
  }
}
