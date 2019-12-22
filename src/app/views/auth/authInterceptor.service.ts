import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return this.authService.user$.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const headers = new HttpHeaders({
          'Authorization': user.token,
          'Content-Type': 'application/json'
        });
        const modifiedHeaders = req.clone({headers});
        return next.handle(modifiedHeaders);
      })
    );

  }

}




