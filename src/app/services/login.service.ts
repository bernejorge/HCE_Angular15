import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { User } from '../Models/User';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  private API_URL : string = "";
  constructor(private http: HttpClient, private configSrv: ConfigService, private router: Router)  { 
      this.configSrv.getConfigJson().subscribe(
        (configJson: any) => {
          try {
            this.API_URL = configJson.API_URL;
          } catch (error) {
            
          }
        });
  }

  
  prueba() {
    window.alert("hola");
  }
  getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });


  }
  login(username: string | null, password: string | null): Observable<any> {
    //limpiear el storage
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('LastVisit');
    
    let httpOptions = {
      headers: this.getHttpHeaders(),
    };

    //let body = `Usuario=${username}&Password=${password}&LoginUnico=true&IdTipoVinculo=2&ClientToken=333`;
    let body = {
      Usuario: username,
      Password: password,
      LoginUnico: true,
      IdTipoVinculo: 2,
      ClientToken: 333
    }
    return this.http.post(`${this.API_URL}/api/Sesion/Login`, body, httpOptions)
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
  public registarse(tipoDocumento: string, documento: string | null, nacimiento: string | null): Observable<any> {

    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);
    const url = window.location.origin;
   
    const urlReg = baseUrl + "/validar-registro"
    let httpOptions = {
      headers: this.getHttpHeaders(),
    };
    //let body = `Documento=${documento}&TipoDocumento=${tipoDocumento}&FechaNacimiento=${nacimiento}&Url=${urlReg}`;
    let body = {
      "Documento": documento,
      "TipoDocumento": 1,
      "FechaNacimiento": nacimiento,
      "Url": urlReg,
    };
    let bodystr = JSON.stringify(body);

    return this.http.post(`${this.API_URL}/api/Sesion/ValidarAlta`, bodystr, httpOptions)
      .pipe(
        map((res: any) => {
          console.log(res);
          if (res.Email) {
            localStorage.setItem('emailAValidar', res.Email);
            localStorage.setItem('UltimoRegistro', new Date().getTime().toString());
          }
          return res;
        }
        )
      );
  }

  public validarCodigo(codigo: number) {
    // /api/Sesion/ValidarCodigoTemporal
    let mail = localStorage.getItem('emailAValidar');
    if (mail == null) {
      mail = "";
    }

    let httpOptions = {
      headers: this.getHttpHeaders(),
    };
    //let body = `Codigo=${codigo}&Email=${mail}`;
    let body = {
      Codigo: codigo,
      Email: mail,
    }
    return this.http.post(`${this.API_URL}/api/Sesion/ValidarCodigoTemporal`, body, httpOptions)
      .pipe(
        map((res: any) => {
          if (res.IdExterno) {
            sessionStorage.setItem('idExterno', res.IdExterno);
            //localStorage.removeItem('emailAValidar');
          }
          return res;
        })

      );
  }

  public registrarPrefilConVinculo(pass: string,) {
    ///api/Sesion/RegistrarPerfilConVinculo
    let mail = localStorage.getItem('emailAValidar');
    const idExt = sessionStorage.getItem('idExterno');
    if (mail == null) {
      mail = "";
    }

    let httpOptions = {
      headers: this.getHttpHeaders(),
    };
    //let body = `Codigo=${codigo}&Email=${mail}`;
    let body = {
      "NombreUsuario": mail,
      "PasswordUsuario": pass,
      "EmailUsuario": mail,
      "IdExterno": idExt,
    }
    return this.http.post(`${this.API_URL}/api/Sesion/RegistrarPerfilConVinculo`, body, httpOptions);
  }
  private saveToken(token: string): void {
    localStorage.setItem('AccessToken', token);
    localStorage.setItem('LastVisit', new Date().getTime().toString());
  }
  public getToken(): string | null {
    return localStorage.getItem('AccessToken');
  }

  public logout(): void {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('LastVisit');
    //Todo: llamar al metodo logout del backend
  }
  public isLoggedIn(): boolean {
    let lastV = localStorage.getItem('LastVisit');
    if (this.getToken() && lastV) {
      try {
        const dateDiff = new Date().getTime() - Number(lastV);
        const tolerenciaMinutos = 10 * 1000 * 60; // 10 minutes
        return dateDiff < tolerenciaMinutos;
      } catch (error) {
        return false
      }
    } else return false;
  }





}
