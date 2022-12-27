import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Base } from '../../../Models/BaseModel';
import { Informe } from '../../../Models/Informe';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-resultados-estudios',
  templateUrl: './resultados-estudios.component.html',
  styleUrls: ['./resultados-estudios.component.css']
})
export class ResultadosEstudiosComponent implements OnInit, OnDestroy {

  informes!: Informe[];
  informesFiltrados?: Informe[];
  suscripcion : Subscription;
  strBuscar: string= "";
  constructor(private PersonaSrv: PersonasService, public activeModal: NgbActiveModal) { 
    this.suscripcion = this.PersonaSrv.$personaSeleccionadaObs
      .subscribe(()=>this.getData());
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {
    
  }

  getData(){
    this.PersonaSrv.obtenerInformes()
      .subscribe((res) => {
        console.log(res);
        this.informes = res.Informes.map(x=> Object.assign(new Informe(), x));
        this.informesFiltrados =  this.informes;
    })
  }

  buscar() {    
    this.informesFiltrados = Base.Filtrar(this.informes, this.strBuscar);
  }
  
  openModal(inf: Informe){
    let informeCompleto: Informe;
    const id = inf.Id ? inf.Id :0
    this.PersonaSrv.obtenerInformesPorId(id)
      .subscribe((res)=>{
        if(res.Informes){
          informeCompleto = res.Informes.map(x=> Object.assign(new Informe(), x))[0];
        }
      }
      )
    console.log(inf.Id, + "  " + inf.Estudio);

  }

}
