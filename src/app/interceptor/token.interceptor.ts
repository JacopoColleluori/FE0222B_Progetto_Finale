import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError, finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string;
  tenant: string;

  constructor(private authSrv: AuthService) {
    this.token = environment.baseToken;
    this.tenant = environment.baseTenant;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let ok: string;
    let authReq: HttpRequest<any> = request.clone({
      headers: request.headers
        .set('Authorization', 'Bearer ' + this.token)
        .set('X-TENANT-ID', this.tenant),
    });

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          ok = event instanceof HttpResponse ? 'succeded' : '';
        },
        (error) => {}
      ),
      catchError((error: HttpErrorResponse) => {
        return this.showErrors(error);
      }),
      finalize(() => {}) //chiudi la chiamata sia che sia andata bene che in errore
    );
  }
  private showErrors(err: any) {
    switch (err.error) {
      case 'Email and password are required':
        return throwError(() => new Error('Email e password richieste'));
        break;
      case 'Email already exists':
        return throwError(() => new Error('Email già esiste'));
        break;
      case 'Email format is invalid':
        return throwError(() => new Error('Formato email invalido'));
        break;
      case 'Cannot find user':
        return throwError(() => new Error('User non trovato'));
        break;
      default:
        return throwError(() => new Error('Bad Request'));
        break;
    }
  }
}
