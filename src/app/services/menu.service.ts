import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Subject } from 'rxjs';
import { SideBarOptions } from '../Models/SideOptions';
import { ConfigService } from './config.service';

@Injectable()
export class MenuService {
  private menuSubject = new BehaviorSubject<boolean>(false);
  private collapsedMenu :boolean = false;
  public $menuObservable = this.menuSubject.asObservable();
  private API_URL : string="";
  private sidebarOptions! : SideBarOptions;

  constructor(private configSrv : ConfigService, private http: HttpClient) { 
    this.getConfig();
  }

  async getConfig(){
    const value = await lastValueFrom (this.configSrv.getConfigJson())

    console.log(value);
  }

  menuToggle(): void {
    this.collapsedMenu = !this.collapsedMenu;
    this.menuSubject.next(this.collapsedMenu);
  }

  async getSideBarOptions(): Promise<SideBarOptions> {
    //datos de prueba Mock
    if(this.sidebarOptions) return this.sidebarOptions;

    let conf: any = await lastValueFrom (this.configSrv.getConfigJson())
    this.API_URL = conf.API_URL;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      })
    };

    const data$ = this.http.get<SideBarOptions>(`${this.API_URL}/api/Portal/ObtenerVariablesDeConfiguracion`, httpOptions)

    const rta= await lastValueFrom(data$.pipe(
      map((value: SideBarOptions) =>{
        const sbo : SideBarOptions = {
          "HCEOnlineHabilita_resumenClinico" : value.HCEOnlineHabilita_resumenClinico,
          "HCEOnlineHabilita_internaciones" : value.HCEOnlineHabilita_internaciones,
          "HCEOnlineHabilita_medicamentos" : value.HCEOnlineHabilita_medicamentos,
          "HCEOnlineHabilita_motivoConsulta" : value.HCEOnlineHabilita_motivoConsulta,
          "HCEOnlineHabilita_profesionalesVIsitados": value.HCEOnlineHabilita_profesionalesVIsitados,
          "HCEOnlineHabilita_resultadoDeEstudios": value.HCEOnlineHabilita_resultadoDeEstudios,
        }
        return value;
      })
    ));
       
    console.log("Data del lastValueFrom: ", rta);
    this.sidebarOptions = rta;
    return rta;
  //  return new Promise<SideBarOptions>((resolve, reject) => {
  //    resolve({
  //      "HCEOnlineHabilita_resumenClinico" : true,
  //      "HCEOnlineHabilita_internaciones" : false,
  //      "HCEOnlineHabilita_medicamentos" : true,
  //      "HCEOnlineHabilita_motivoConsulta" : false,
  //      "HCEOnlineHabilita_profesionalesVIsitados": true,
  //      "HCEOnlineHabilita_resultadoDeEstudios": true,
  //    });
  //  });    
 }

}
