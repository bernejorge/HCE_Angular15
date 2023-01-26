import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Episodio } from '../Models/Episodio';
import { Persona } from '../Models/Persona';
import { RespuestaEpicrisis, RespuestaEpisodios, RespuestaInformes, RespuestaPrescripcion, RespuestaProblemas, RespuestaSignosVitales, RespuestaTurnos } from '../Models/RespuestasInterfaces';
import { ConfigService } from './config.service';
import { LoginService } from './login.service';

@Injectable()
export class PersonasService {
  
  public personasACargo !: Persona[];
  private personaSeleccionada = new BehaviorSubject<Persona|undefined>(undefined);
  private relaciones = new Subject<Persona[]>();
  private pSeleccionada!: Persona;
  public $personaSeleccionadaObs = this.personaSeleccionada.asObservable();
  public $relacionesObs = this.relaciones.asObservable();
  private API_URL : string="";
  private  headers= new HttpHeaders({
    
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient, private loginService: LoginService, private configSrv : ConfigService) { 
    
    this.configSrv.getConfigJson().subscribe(
      (conf:any)=>{
        this.API_URL = conf.API_URL;
        this.obtenerRelaciones();
      }
    );
  }


  async obtenerRelaciones(): Promise<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      })
    };
    let body = ``;
    let r: Persona[];
     await this.http.get(`${this.API_URL}/api/Portal/ObtenerRelaciones`, httpOptions)
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
    return this.http.get<RespuestaInformes>(`${this.API_URL}/api/Portal/ObtenerInformes`,this.getHttpOptionsByIdPersona());
  }

  obtenerInformesPorId(id: number){
    let params = new HttpParams();
    params = params.append('idInforme',id.toString());
    
    let httpOptions={
      headers: this.headers,
      params: params
    }
    //api/Portal/ObtenerInformesPorId
    return this.http.get<RespuestaInformes>(`${this.API_URL}/api/Portal/ObtenerInformesPorId`,httpOptions);
  }

  obtenerMedicacion(){    
    ///api/Portal/ObtenerPrescripciones

    return this.http.get<RespuestaPrescripcion>(`${this.API_URL}/api/Portal/ObtenerPrescripciones`,this.getHttpOptionsByIdPersona())
    
  }

  obtenerProfesionalesVisitados() {

    return this.http.get<RespuestaTurnos>(`${this.API_URL}/api/Portal/ObtenerTurnos`,this.getHttpOptionsByIdPersona())
  }

  obtenerAlergias(){
    ///api/Portal/ObtenerAlergiasPorPersona
    return this.http.get<RespuestaProblemas>(`${this.API_URL}/api/Portal/ObtenerAlergiasPorPerson`,this.getHttpOptionsByIdPersona())
  }

  obtenerSignosVitales(){
    //api/Portal/ObtenerSignosVitales
    return this.http.get<RespuestaSignosVitales>(`${this.API_URL}/api/Portal/ObtenerSignosVitales`,this.getHttpOptionsByIdPersona());
  }

  obtenerProblemas(){

    ///api/Portal/ObtenerProblemas
    return this.http.get<RespuestaProblemas>(`${this.API_URL}/api/Portal/ObtenerProblemas`,this.getHttpOptionsByIdPersona())
  }

  obtenerEpisodios(){
    ///api/Portal/ObtenerEpisodios
    return this.http.get<RespuestaEpisodios>(`${this.API_URL}/api/Portal/ObtenerEpisodios`,this.getHttpOptionsByIdPersona())

  }

  obtenerEpicrisisPorIdEpisodio(id: number) {
    let params = new HttpParams();
    params = params.append('idEpisodio',id.toString());
    
    let httpOptions={
      headers: this.headers,
      params: params
    }

    //api/Portal/ObtenerEpicrisis
    return this.http.get<RespuestaEpicrisis>(`${this.API_URL}/api/Portal/ObtenerEpicrisis`,httpOptions);

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
