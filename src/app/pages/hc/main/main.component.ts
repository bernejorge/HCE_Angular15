import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  browserRefresh!: boolean;

  constructor(private personaSrv: PersonasService) {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.subscription = this.personaSrv.$personaSeleccionadaObs
      .subscribe(person => {
        if (person) { console.log("Persona Seleccionada = " + person.NombreCompleto);}
      });


      

  }

}
