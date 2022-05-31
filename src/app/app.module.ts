import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { DettaglioFattureComponent } from './components/fatture/dettaglio-fatture/dettaglio-fatture.component';
import { ListaFattureComponent } from './components/fatture/lista-fatture/lista-fatture.component';
import { ListaClientiComponent } from './components/clienti/lista-clienti/lista-clienti.component';
import { DettagliClienteComponent } from './components/clienti/dettagli-cliente/dettagli-cliente.component';
import { ListaUserComponent } from './components/user/lista-user/lista-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatPaginatorGotoComponent } from './components/mat-paginator-goto/mat-paginator-goto.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    NavbarComponent,
    DettaglioFattureComponent,
    ListaFattureComponent,
    ListaClientiComponent,
    DettagliClienteComponent,
    ListaUserComponent,
    MatPaginatorGotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
