import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DettagliClienteComponent } from './components/clienti/dettagli-cliente/dettagli-cliente.component';
import { ListaClientiComponent } from './components/clienti/lista-clienti/lista-clienti.component';
import { DettaglioFattureComponent } from './components/fatture/dettaglio-fatture/dettaglio-fatture.component';
import { ListaFattureComponent } from './components/fatture/lista-fatture/lista-fatture.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ListaUserComponent } from './components/user/lista-user/lista-user.component';

const routes: Routes = [
  {path:'',
component:HomeComponent},
  {path:"login",
component:LoginComponent},
{
  path:"sign-up",
  component:SignUpComponent
},
{
  path:"lista-clienti",
  component:ListaClientiComponent,
  canActivate:[AuthGuard]
},
{
  path:"lista-clienti/:id",
  component:DettagliClienteComponent,
  canActivate:[AuthGuard]
},
{
  path:"lista-fatture/:id",
  component:DettaglioFattureComponent,
  canActivate:[AuthGuard]
},
{
  path:"lista-fatture/:id/:idCliente",
  component:DettaglioFattureComponent,
  canActivate:[AuthGuard]
},
{
  path:"lista-fatture",
  component:ListaFattureComponent,
  canActivate:[AuthGuard]
},
{
  path:"lista-fatture/cliente/:id",
  component:ListaFattureComponent,
  canActivate:[AuthGuard]
},
{
  path:"lista-user",
  component:ListaUserComponent,
  canActivate:[AuthGuard]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
