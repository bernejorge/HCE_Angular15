import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SideBarOptions } from 'src/app/Models/SideOptions';
import { MenuService } from 'src/app/services/menu.service';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  browserRefresh!: boolean;
  menuOptions!: SideBarOptions;

  constructor(private personaSrv: PersonasService, private menuSrv: MenuService, private router: Router) {
   
  }
  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit() {

    this.subscription = this.personaSrv.$personaSeleccionadaObs
      .subscribe(person => {
        if (person) { console.log("Persona Seleccionada = " + person.NombreCompleto);}
      });     
      this.getMenuOptions();
  }
  async getMenuOptions() {
    this.menuOptions = await this.menuSrv.getSideBarOptions();
    console.log(this.menuOptions);
    if (this.menuOptions.HCEOnlineHabilita_resumenClinico){
      this.router.navigate(['/main/resumen']);
    } else if(this.menuOptions.HCEOnlineHabilita_motivoConsulta) {
      this.router.navigate(['/main/motivo-consulta']);
    } else if(this.menuOptions.HCEOnlineHabilita_profesionalesVIsitados){ 
      this.router.navigate(['/main/profesionales']);
    } else if(this.menuOptions.HCEOnlineHabilita_resultadoDeEstudios){
      this.router.navigate(['/main/resultados']); 
    } else if(this.menuOptions.HCEOnlineHabilita_medicamentos){
      this.router.navigate(['/main/medicamentos']);
    } else if (this.menuOptions.HCEOnlineHabilita_internaciones){
      this.router.navigate(['/main/internaciones']);
    } 

  }

}
