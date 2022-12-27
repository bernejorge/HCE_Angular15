import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let authenticationService = this.injector.get(AuthenticationService);
    const auth = this.injector.get(LoginService);
    let token = auth.getToken();
    console.log('Token intercept: ' + token);
    if(!token){token="1234"};
    if (token) {
      const headers = new HttpHeaders(
        { 'Authorization': `Bearer  ${token}` }
      );
      

      const autReq = req.clone({
        headers: req.headers.set('Authorization', `${token}`).set('From', `${token}`)
      });
      return next.handle(autReq);

    } else {
      return next.handle(req);
    }

  }

}
