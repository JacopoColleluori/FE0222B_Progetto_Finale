import {  Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataAuth } from 'src/app/models/dataauth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
checkLogin$!:Observable<boolean>
checkUser$!:Observable<DataAuth|null>
  constructor(private authSrv:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.checkLogin$=this.authSrv.loginControl$
    console.log(this.authSrv.loginControl$)
    console.log(this.checkLogin$)
    console.log(this.checkLogin$.subscribe())
    // this.authSrv.loginControl$.subscribe(res=>{
    //   console.log(res)

    // })

  }


delete(){
  localStorage.clear();
  this.authSrv.loginStatus.next(false)
  this.authSrv.loginControl$.subscribe()
  console.log(this.authSrv.loginStatus)
  console.log(this.authSrv.loginControl$)
  this.router.navigate(['/login'])
}
}
