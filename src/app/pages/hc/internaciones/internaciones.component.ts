import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Episodio } from '../../../Models/Episodio';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-internaciones',
  templateUrl: './internaciones.component.html',
  styleUrls: ['./internaciones.component.css']
})
export class InternacionesComponent implements OnInit, OnDestroy{

  suscripcion: Subscription;
  episodios?: Episodio[];
  constructor(private personaSrv: PersonasService) { 
    this.suscripcion= this.personaSrv.$personaSeleccionadaObs
    .subscribe(()=>this.getData());
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {
   
  }

  getData(){
    this.personaSrv.obtenerEpisodios()
      .subscribe((res)=>{
        console.log(res);
      });
  }

}
