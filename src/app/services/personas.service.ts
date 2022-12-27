import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Persona } from '../Models/Persona';
import { RespuestaEpisodios, RespuestaInformes, RespuestaPrescripcion, RespuestaProblemas, RespuestaTurnos } from '../Models/RespuestasInterfaces';
import { LoginService } from './login.service';

@Injectable()
export class PersonasService {
  
  public personasACargo !: Persona[];
  private personaSeleccionada = new BehaviorSubject<Persona|undefined>(undefined);
  private relaciones = new Subject<Persona[]>();
  private pSeleccionada!: Persona;
  public $personaSeleccionadaObs = this.personaSeleccionada.asObservable();
  public $relacionesObs = this.relaciones.asObservable();

  private  headers= new HttpHeaders({
    
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient, private loginService: LoginService) { }

  async obtenerRelaciones(): Promise<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      })
    };
    let body = ``;
    let r: Persona[];
     await this.http.get(`${environment.API_URL}/api/Portal/ObtenerRelaciones`, httpOptions)
      .toPromise().then(
        (res:any) =>{          
          r = res.Personas;          
          this.personasACargo = r;
          this.pSeleccionada= this.personasACargo[0];
          this.personaSeleccionada.next(this.personasACargo[0]);
          this.relaciones.next(this.personasACargo);
          
        });  

    return this.personasACargo;
  }

  cambiarPersona(person: Persona){
    //notificamos a todos los observadores que se selecciono otra persona a cargo
    this.pSeleccionada= person;
    this.personaSeleccionada.next(person);
    
  }
  reload(){
    this.relaciones.next(this.personasACargo);
  }

  obtenerInformes(){   
    
    ///api/Portal/ObtenerInformes
    return this.http.get<RespuestaInformes>(`${environment.API_URL}/api/Portal/ObtenerInformes`,this.getHttpOptionsByIdPersona());
  }

  obtenerInformesPorId(id: number){
    let params = new HttpParams();
    params = params.append('idInforme',id.toString());
    
    let httpOptions={
      headers: this.headers,
      params: params
    }
    //api/Portal/ObtenerInformesPorId
    return this.http.get<RespuestaInformes>(`${environment.API_URL}/api/Portal/ObtenerInformesPorId`,httpOptions);
  }

  obtenerMedicacion(){    
    ///api/Portal/ObtenerPrescripciones

    return this.http.get<RespuestaPrescripcion>(`${environment.API_URL}/api/Portal/ObtenerPrescripciones`,this.getHttpOptionsByIdPersona())
    
  }

  obtenerProfesionalesVisitados() {

    return this.http.get<RespuestaTurnos>(`${environment.API_URL}/api/Portal/ObtenerTurnos`,this.getHttpOptionsByIdPersona())
  }

  obtenerAlergias(){
    ///api/Portal/ObtenerAlergiasPorPersona
    return this.http.get<RespuestaProblemas>(`${environment.API_URL}/api/Portal/ObtenerAlergiasPorPerson`,this.getHttpOptionsByIdPersona())
  }

  obtenerProblemas(){

    ///api/Portal/ObtenerProblemas
    return this.http.get<RespuestaProblemas>(`${environment.API_URL}/api/Portal/ObtenerProblemas`,this.getHttpOptionsByIdPersona())
  }

  obtenerEpisodios(){
    ///api/Portal/ObtenerEpisodios
    return this.http.get<RespuestaEpisodios>(`${environment.API_URL}/api/Portal/ObtenerEpisodios`,this.getHttpOptionsByIdPersona())

  }

  private getHttpOptionsByIdPersona(){
    let params = new HttpParams();
    params = params.append('idPersona',this.pSeleccionada.Id.toString());
    
    let httpOptions={
      headers: this.headers,
      params: params
    }
    return httpOptions;
  }
  private getHttpOptionsByPersonaACargo(){
    let params = new HttpParams();
    params = params.append('idPersonaACargo',this.pSeleccionada.Id.toString());
    
    let httpOptions={
      headers: this.headers,
      params: params
    }
    return httpOptions;
  }
}
