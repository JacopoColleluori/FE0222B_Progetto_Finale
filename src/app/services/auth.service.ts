import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataAuth } from '../models/dataauth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseUrl:string;
 user:any;
 loginStatus= new BehaviorSubject<boolean >(false)
 authSubject= new BehaviorSubject<null | DataAuth>(null)


  loginControl$= this.loginStatus.asObservable();


  constructor(private http:HttpClient) {
    this.baseUrl=environment.urlApi;
    this.user=localStorage.getItem('current-user')
    console.log(this.user)
    if(this.user){
      this.loginStatus.next(true)
    }else(
      this.loginStatus.next(false)
    )

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

}
