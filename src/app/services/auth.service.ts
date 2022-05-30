import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataAuth } from '../models/dataauth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseUrl:string;
 authSubject= new BehaviorSubject<null | DataAuth>(null)

  userControl$= this.authSubject.asObservable();

  constructor(private http:HttpClient) {
    this.baseUrl=environment.urlApi;
   }
   Login(data:any){
    console.log(data)
    return this.http.post<any>(this.baseUrl+ '/api/auth/login',data)
  }

   SignUp(data:any){
    console.log(data)
    return this.http.post<any>(this.baseUrl+ '/api/auth/signup',data)
   }

  userGetAll(page:number,size:number){
  return this.http.get<any>(`${this.baseUrl}/api/users?page=${page}&size=${size}`)
   }
  get isLogged():boolean{
    return localStorage.getItem('current-user')!= null;
  }
  // get CurrentUser():User{
  //   return JSON.parse(localStorage.getItem('current-user')) as User || null;
  // }
}
