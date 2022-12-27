import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../Models/User';

@Injectable()
export class LoginService {
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  prueba(){
    window.alert("hola");
  }

  login(username: string, password: string ): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      })
    };
    let body = `Usuario=${username}&Password=${password}&LoginUnico=true&IdTipoVinculo=2&ClientToken=333`;
    return this.http.post(`${environment.API_URL}/api/Sesion/Login`, body, httpOptions)
      .pipe(
        map((res: any) => {
          console.log('Res:= ', res);
          //saveToken
          this.saveToken(res.AccessToken);
          this.loggedIn.next(true);
          return res;
        })
      );
  }
  private saveToken(token: string): void {
    localStorage.setItem('AccessToken', token);
  }
  public getToken(): string | null {
    return localStorage.getItem('AccessToken');
  }
 
}
