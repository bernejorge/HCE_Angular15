import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from '../login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrarseModalComponent } from './registrarse-modal/registrarse-modal.component';


const appRoutes: Routes = [  
    {path: 'principal', component: PrincipalComponent}
  

];
@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    RouterModule.forChild(appRoutes),
    ReactiveFormsModule
  ],
  declarations: [PrincipalComponent, RegistrarseModalComponent],
  exports:[
  	PrincipalComponent,
  ],
  entryComponents: [RegistrarseModalComponent],
})
export class PrincipalModule { }
