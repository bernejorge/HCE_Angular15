import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: '', redirectTo : 'home', pathMatch: "full" },
  { path: 'home', loadChildren:()=>import('./pages/principal/principal.module').then(m=> m.PrincipalModule) },
 
  { path: 'login',  loadChildren:()=>import('./pages/login/login.module').then(m=> m.LoginModule) },
 
  { path: 'main', loadChildren:()=>import('./pages/hc/hc.module').then(m=> m.HcModule)}
 
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
