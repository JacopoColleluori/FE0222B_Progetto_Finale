import { Component, OnInit } from '@angular/core';
import {  PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrls: ['./lista-user.component.scss']
})
export class ListaUserComponent implements OnInit {


  dataUsers:any;
  displayedColumns: string[] = ['id', 'email', 'nome','cognome','roles'];
  constructor(private authSrv:AuthService,) {

  }

  ngOnInit(): void {

   //chiamata iniziale per popolare la lista di users
    this.authSrv.userGetAll(0,20)
    .pipe(
    )
    .subscribe((res)=>{
      console.log(res)
      console.log(res.content)
      this.dataUsers=res;
      console.log(this.dataUsers)
      console.log(this.dataUsers.content)
      console.log(this.dataUsers.content[1].roles[0].roleName)


    })
  }


onPageEvent(event:PageEvent){
this.authSrv.userGetAll(event.pageIndex,event.pageSize)
.subscribe(
  res=>{
    console.log(res)
    this.dataUsers=res;
    console.log(this.dataUsers)
  }
)
 }
}
