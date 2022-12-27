import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from '../login/login.module';

const appRoutes: Routes = [
  {path: '', component: PrincipalComponent}

];
@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [PrincipalComponent],
  exports:[
  	PrincipalComponent,
  ]
  
})
export class PrincipalModule { }
