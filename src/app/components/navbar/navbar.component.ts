import {  Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
control!:Boolean;
  constructor(private authSrv:AuthService) { }

  ngOnInit(): void {
    this.control=this.authSrv.isLogged;
  }


delete(){
  localStorage.clear();
  window.location.reload();
}
}
