import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITurno } from '../../../Models/Turnos';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit, OnDestroy {
  turnos!: ITurno[];
  suscripcion!: Subscription;
  constructor(private personaSrv: PersonasService ) { 
    this.suscripcion = this.personaSrv.$personaSeleccionadaObs
    .subscribe(()=>this.getData());  
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {

     
  }

  getData(){
    this.personaSrv.obtenerProfesionalesVisitados()
      .subscribe((res)=>{
        console.log(res);
        this.turnos = res.Turnos;
      })
  }

}
