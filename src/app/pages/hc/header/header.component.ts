import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  constructor(private personSrv : PersonasService, private menuSrv : MenuService) { 
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
}
