import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginInicioComponent } from './pages/login-inicio/login-inicio.component';

const appRoutes: Routes = [
  { path: '', redirectTo : 'home', pathMatch: "full" },
  { path: 'home', component: LoginInicioComponent},
 
  { path: 'login',  loadChildren:()=>import('./pages/login/login.module').then(m=> m.LoginModule) },
 
  { path: 'main', loadChildren:()=>import('./pages/hc/hc.module').then(m=> m.HcModule)}
 
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
