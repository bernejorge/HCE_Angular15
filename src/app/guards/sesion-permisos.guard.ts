
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionPermisosGuard implements CanActivate, CanActivateChild  {

  constructor(private LoginSrv : LoginService, private router : Router){
    
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    const result = this.LoginSrv.isLoggedIn()
    
    if(!result){
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Su sesión ha expirado',
       });
      this.router.navigate(['/home']);
      return false;
    }      

    return result;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const result = this.LoginSrv.isLoggedIn()
    
    if(!result){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Su sesión ha expirado',
       });
      this.router.navigate(['/']);
    }      

    return result;
  }
  
}
