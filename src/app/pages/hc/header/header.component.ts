import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { Persona } from '../../../Models/Persona';
import { MenuService } from '../../../services/menu.service';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private suscripcion: Subscription;
  public personas!: any[];
  public presonaSeleccionada!: Persona;
  constructor(private personSrv : PersonasService, private menuSrv : MenuService, private loginSrv: LoginService, private router: Router) { 
    this.suscripcion = this.personSrv.$relacionesObs
    .subscribe({
      next: (relaciones)=>{
        this.personas = relaciones;
        this.presonaSeleccionada = relaciones[0];
        console.log("Acabo de obtenerRelaciones!!!")
      }
    })
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {
  }

  onClick(){
    this.personSrv.reload();
  }

  onMenuClick(){
    console.log("Click en el menu toggle!");
    this.menuSrv.menuToggle();
  }
  onChangePersonaSeleccionada(p: Persona){
    this.presonaSeleccionada = p;
    this.personSrv.cambiarPersona(this.presonaSeleccionada);
  }

  cerrarSesion(){
      this.loginSrv.logout();
      this.router.navigate(['/home']); 
  }
}
