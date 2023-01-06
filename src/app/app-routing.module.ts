import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SesionPermisosGuard } from './guards/sesion-permisos.guard';
import { GenerarPasswordComponent } from './pages/generar-password/generar-password.component';
import { LoginInicioComponent } from './pages/login-inicio/login-inicio.component';
import { ValidarRegistroComponent } from './pages/validar-registro/validar-registro.component';

const appRoutes: Routes = [
  { path: '', redirectTo : 'home', pathMatch: "full" },
  { path: 'home', component: LoginInicioComponent},
 
  { path: 'login',  loadChildren:()=>import('./pages/login/login.module').then(m=> m.LoginModule) },
  { path: 'validar-registro', component: ValidarRegistroComponent},
  {path: 'generar-password', component: GenerarPasswordComponent},
  { path: 'main', canActivate:[SesionPermisosGuard], loadChildren:()=>import('./pages/hc/hc.module').then(m=> m.HcModule)}
 
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
