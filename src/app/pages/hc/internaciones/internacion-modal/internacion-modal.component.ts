import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Persona } from 'src/app/Models/Persona';
import { PersonasService } from 'src/app/services/personas.service';
import {  EpicrisisClass } from '../../../../Models/Epicrisis';
import { Episodio } from '../../../../Models/Episodio';
import { RespuestaEpicrisis } from '../../../../Models/RespuestasInterfaces';

@Component({
  selector: 'app-internacion-modal',
  templateUrl: './internacion-modal.component.html',
  styleUrls: ['./internacion-modal.component.css']
})
export class InternacionModalComponent implements OnInit {

  @Input() Epicrisis!: EpicrisisClass[];
  @Input()
  Episodio!: Episodio;
  private suscripcion: Subscription;
 
  public presonaSeleccionada!: Persona|undefined;

  constructor(public activeModal: NgbActiveModal, public personaSrv: PersonasService) { 
    this.suscripcion = this.personaSrv.$personaSeleccionadaObs
      .subscribe(
        {
          next: (personaSeleccionada) => {
            this.presonaSeleccionada = personaSeleccionada;
          },
          error: (error) => {
            console.log(error);
          }
        }        
      )
      
  }

  ngOnInit() {
    console.log(this.Episodio);
    console.log(this.Epicrisis);
  }
  imprimir() {
    // const printContent = document.getElementById("printThis");
    // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.innerHTML);
    // WindowPrt.document.close();
    // WindowPrt.focus();
    // WindowPrt.print();
    // WindowPrt.close();
    window.print();
  }

}
