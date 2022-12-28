import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Base } from '../../../Models/BaseModel';
import {  Turno } from '../../../Models/Turnos';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit, OnDestroy {
  p: number = 1;
  cantidad: number = 10;
  turnos!: Turno[];
  tunosFiltrados: Turno[] = [];
  suscripcion!: Subscription;
  buscarTxt:string = "";
  constructor(private personaSrv: PersonasService ) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {

    this.suscripcion = this.personaSrv.$personaSeleccionadaObs
      .subscribe((res)=>{
        if (res)
        this.getData()});
  }

  getData(){
    this.personaSrv.obtenerProfesionalesVisitados()
      .subscribe((res)=>{
        console.log(res);
        this.turnos = res.Turnos.map((x: any)=> Object.assign(new Turno,x));
        this.tunosFiltrados = this.turnos;
      })
  }
  key: string= 'FechaAltaProblema';
  reverse:boolean = false;
  sort(key: string){
   this.key =key;
   this.reverse = !this.reverse;
  }

  buscar(){
    this.tunosFiltrados = Base.Filtrar(this.turnos, this.buscarTxt);
  }
}
