import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { PrincipalModule } from './pages/principal/principal.module';
import { LoginModule } from './pages/login/login.module';
import { LoginComponent } from './pages/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HcModule } from './pages/hc/hc.module';
import { TokenInterceptorService } from './iterceptors/token-interceptor.service';
import { LoginService } from './services/login.service';
import { PersonasService } from './services/personas.service';
import { CoreModule } from './services/core.module';
import { SpinnerComponent } from './pages/spinner/spinner.component';
import { SpinnerModule } from './pages/spinner/spinner.module';
import { SpinnerInterceptor } from './iterceptors/spinner-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SesionPermisosGuard } from './guards/sesion-permisos.guard';
import { ValidarRegistroComponent } from './pages/validar-registro/validar-registro.component';


import { ErrorCatchingInterceptor } from './iterceptors/error-catching.interceptor';
import { LoginInicioComponent } from './pages/login-inicio/login-inicio.component';

import { RegistroExitosoComponent } from './pages/login-inicio/modales/registro-exitoso/registro-exitoso.component';
import { RegistrarseComponent } from './pages/login-inicio/modales/registrarse/registrarse.component';
import { RecuperarClaveComponent } from './pages/login-inicio/modales/recuperar-clave/recuperar-clave.component';
import { GenerarPasswordComponent } from './pages/generar-password/generar-password.component';
import { TerminosCondicionesComponent } from './pages/login-inicio/modales/terminos-condiciones/terminos-condiciones.component';
import { OlvidoSuPassComponent } from './pages/login-inicio/modales/olvido-su-pass/olvido-su-pass.component';
import { AppRoutingModule } from './app-routing.module';

// const appRoutes: Routes = [
//   { path: '', redirectTo : 'home', pathMatch: "full" },
//   { path:'home', component: LoginInicioComponent },
//   { path: 'login',  loadChildren:"./pages/login/login.module" },
//   { path: 'validar-registro', component: ValidarRegistroComponent},
//   {path: 'generar-password', component: GenerarPasswordComponent},
//   { path: 'main', loadChildren: "./pages/hc/hc.module#HcModule", canActivate:[SesionPermisosGuard]}
// ];

const appRoutes: Routes = [
  { path: '', redirectTo : 'home', pathMatch: "full" },
  { path: 'home', loadChildren:()=>import('./pages/principal/principal.module').then(m=> m.PrincipalModule) },
 
  { path: 'login',  loadChildren:()=>import('./pages/login/login.module').then(m=> m.LoginModule) },
 
  { path: 'main', loadChildren:()=>import('./pages/hc/hc.module').then(m=> m.HcModule)}
 
];
@NgModule({
  declarations: [
    AppComponent,
    ValidarRegistroComponent,
    LoginInicioComponent,
    RegistrarseComponent,
    RegistroExitosoComponent,
    RecuperarClaveComponent,
    GenerarPasswordComponent,
    TerminosCondicionesComponent,
    OlvidoSuPassComponent,
    
  ],
  entryComponents:[ RegistrarseComponent, RegistroExitosoComponent, TerminosCondicionesComponent, OlvidoSuPassComponent],
  imports: [ 
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PrincipalModule,
    LoginModule,
    HttpClientModule,
    HcModule,
    CoreModule,
    SpinnerModule,  
    NgbModule  
  ],
  exports: [SpinnerComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: LoginService,
      useClass: LoginService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
