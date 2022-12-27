import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(private personaSrv: PersonasService) {

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.personaSrv.obtenerRelaciones().then(
      () => {
        this.subscription = this.personaSrv.$personaSeleccionadaObs
          .subscribe(person => {
            console.log("Persona Seleccionada = " + person!.NombreCompleto!);
          });
      });

  }

}
