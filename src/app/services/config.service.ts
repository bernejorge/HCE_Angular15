import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Configuracion } from '../Models/Configuracion';
import { Episodio } from '../Models/Episodio';
import { Persona } from '../Models/Persona';
import { RespuestaEpicrisis, RespuestaEpisodios, RespuestaInformes, RespuestaPrescripcion, RespuestaProblemas, RespuestaSignosVitales, RespuestaTurnos } from '../Models/RespuestasInterfaces';
import { LoginService } from './login.service';

@Injectable()
export class ConfigService{
    public configuraciones!: Configuracion;
    public configSubject = new BehaviorSubject<Configuracion|undefined>(undefined);
    public configObs$ = this.configSubject.asObservable();
    constructor(private http: HttpClient){
        this.getConfigJson().subscribe(
            (res:any)=>{
                this.configuraciones = new Configuracion(res.API_URL, res.URL_TO_PASS);
                this.configSubject.next(this.configuraciones);
            }
        );
    }

    getConfigJson(){
        let path = './assets/config.json';
        return this.http.get(path);
    }
}