import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPrescripcion, Prescripcion } from '../../../Models/Prescripcion';
import { RespuestaPrescripcion } from '../../../Models/RespuestasInterfaces';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit, OnDestroy {

  prescripciones?: Prescripcion[];
  prescripcionesFiltradas?: Prescripcion[];
  
  suscripcion!: Subscription;

  constructor(private personaSrv: PersonasService) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {
    this.suscripcion = this.personaSrv.$personaSeleccionadaObs
      .subscribe(()=>this.getData());
    
  }

  getData(){
    this.personaSrv.obtenerMedicacion()
    .subscribe((res:RespuestaPrescripcion)=>{
        console.log(res);
        this.prescripciones = res.Prescripciones.map(x=> Object.assign(new Prescripcion(),x));
        this.prescripcionesFiltradas = this.prescripciones;
        console.log(this.prescripciones[0].IndicacionMedica + ' ' 
                  + this.prescripciones[0].EstadoPrescripcion + ' ' 
                  + this.prescripciones[0].obtenerClass());
    });
  }

  busqueda(){

  }

}
