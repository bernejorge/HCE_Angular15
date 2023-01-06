import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Base } from '../../../Models/BaseModel';
import { Episodio, EpisodioInterface } from '../../../Models/Episodio';
import { PersonasService } from '../../../services/personas.service';
import { InternacionModalComponent } from './internacion-modal/internacion-modal.component';
import {  EpicrisisClass } from '../../../Models/Epicrisis';

@Component({
  selector: 'app-internaciones',
  templateUrl: './internaciones.component.html',
  styleUrls: ['./internaciones.component.css']
})
export class InternacionesComponent implements OnInit, OnDestroy{

  p: number = 1;
  cantidad: number = 10;
  suscripcion!: Subscription;
  episodios!: Episodio[];
  episodiosFiltrados?: Episodio[];
  buscarTxt: string = "";
  constructor(private personaSrv: PersonasService, private modalService: NgbModal ) { 

  }
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
    this.personaSrv.obtenerEpisodios()
      .subscribe((res)=>{
        console.log(res);
        this.episodios = res.Episodios.map(x=> Object.assign(new Episodio(), x));
        this.episodiosFiltrados = this.episodios;
      });
  }

  validateDate(date:string):string {
    return Base.validateDate(date);
  }

  openModal(episodio: EpisodioInterface){
    let epis:EpicrisisClass[];
    this.personaSrv.obtenerEpicrisisPorIdEpisodio(episodio.Id)
      .subscribe((res)=>{
        console.log(res);        
        if(res.Epicrisis){
          epis = res.Epicrisis.map(x=> Object.assign(new EpicrisisClass(), x));
          const modalRef = this.modalService.open(InternacionModalComponent, {size: 'lg'});
          modalRef.componentInstance.Epicrisises = epis;
          modalRef.componentInstance.Episodio = episodio;
        }
      }
      );
    

  }

  key: string= 'FechaAltaProblema';
  reverse:boolean = false;
  sort(key: string){
   this.key =key;
   this.reverse = !this.reverse;
  }

  buscar() {
    this.episodiosFiltrados = Base.Filtrar(this.episodios, this.buscarTxt);
  }
} 
