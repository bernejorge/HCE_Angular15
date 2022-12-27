import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Base } from '../../../Models/BaseModel';
import { Problema, ProblemaInterface } from '../../../Models/Problema';
import { PersonasService } from '../../../services/personas.service';

@Component({
  selector: 'app-motivo-consulta',
  templateUrl: './motivo-consulta.component.html',
  styleUrls: ['./motivo-consulta.component.css']
})
export class MotivoConsultaComponent implements OnInit, OnDestroy {

  public problemas!: Problema[];
  public problemasFiltrados?: Problema[];
  public nombreProblema :any;
  private suscripcion: Subscription;
  constructor(private personaSrv: PersonasService) { 
    this.suscripcion = this.personaSrv.$personaSeleccionadaObs.subscribe(
      ()=>this.getData()
    );
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {
    
  }

  getData() { 
    this.personaSrv.obtenerProblemas()
      .subscribe(res=>{
        console.log(res);
        this.problemas = res.Problemas.map(x=> Object.assign(new Problema(),x));
        this.problemasFiltrados = this.problemas;
      });
  }
  validateDate(d:Date|undefined) {

    const d0 = new Date("0001-01-01T00:00:00");
    let d1! : Date;
    if (d == undefined){
      d1 = d0;
      return "";
    }else{
      d1 = d;
      if(d1 === d0){
        return "";
      }
      return d1
    }
   
  }

  buscar(){     
   
      this.problemasFiltrados = Base.Filtrar(this.problemas!,this.nombreProblema!);
      // this.problemasFiltrados = this.problemas.filter(
      //   (p)=> {
      //     return p.Problema.toLowerCase().match(this.nombreProblema.toLowerCase())
      //   }
      // );
    
   }
 
}
