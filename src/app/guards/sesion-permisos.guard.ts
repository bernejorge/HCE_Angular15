import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Injectable()
export class SesionPermisosGuard implements CanActivate, CanActivateChild  {

  constructor(private LoginSrv : LoginService, private router : Router){
    
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    const result = this.LoginSrv.isLoggedIn()
    
    if(!result){
      
      Swal({
        title: 'Error',
        text: 'Su sesión ha expirado',
        type: 'error'
       })
      this.router.navigate(['/home']);
      return false;
    }      

    return result;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const result = this.LoginSrv.isLoggedIn()
    
    if(!result){
      alert("Su sesión a expirado");
      this.router.navigate(['/']);
    }      

    return result;
  }
  
}
