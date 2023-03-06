import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SideBarOptions } from '../Models/SideOptions';

@Injectable()
export class MenuService {
  private menuSubject = new BehaviorSubject<boolean>(false);
  private collapsedMenu :boolean = false;
  public $menuObservable = this.menuSubject.asObservable();
  constructor() { 

  }

  menuToggle(): void {
    this.collapsedMenu = !this.collapsedMenu;
    this.menuSubject.next(this.collapsedMenu);
  }

  async getSideBarOptions(): Promise<SideBarOptions> {
    //datos de prueba Mock

   return new Promise<SideBarOptions>((resolve, reject) => {
     resolve({
       "HCEOnlineHabilita_resumenClinicoHCEOnline" : true,
       "Habilita_internaciones" : true,
       "Habilita_medicamentosHCEOnline" : false,
       "Habilita_motivoConsultaHCEOnline" : false,
       "Habilita_profesionalesVIsitadosHCEOnline": true,
       "Habilita_resultadoDeEstudiosHCEOnline": true,
     });
   });    
 }

}
