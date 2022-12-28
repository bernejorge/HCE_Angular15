import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Base } from '../../../Models/BaseModel';
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
  strBuscar: any;
  p: number = 1;
  cantidad: number = 10;

  suscripcion!: Subscription;

  constructor(private personaSrv: PersonasService) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {
    this.suscripcion = this.personaSrv.$personaSeleccionadaObs
      .subscribe((res) => {
        if (res)
          this.getData()
      });

  }

  getData() {
    this.personaSrv.obtenerMedicacion()
      .subscribe((res: RespuestaPrescripcion) => {
        console.log(res);
        this.prescripciones = res.Prescripciones.map(x => Object.assign(new Prescripcion(), x));
        this.prescripcionesFiltradas = this.prescripciones;

      });
  }

  buscar() {
    if (this.prescripciones) this.prescripcionesFiltradas = Base.Filtrar(this.prescripciones, this.strBuscar);
  }

  key: string = 'FechaAltaProblema';
  reverse: boolean = true;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
