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
  public problemasFiltrados!: Problema[];
  public nombreProblema :any;
  private suscripcion!: Subscription;
  p: number = 1;
  cantidad: number = 10;
  constructor(private personaSrv: PersonasService) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {
    this.suscripcion = this.personaSrv.$personaSeleccionadaObs
      .subscribe((res)=>{
        if (res)
        this.getData()});
  }

  getData() { 
    this.personaSrv.obtenerProblemas()
      .subscribe(res=>{
        console.log(res);
        this.problemas = res.Problemas.map(x=> Object.assign(new Problema(),x));
        this.problemasFiltrados = this.problemas;
      });
  }
  validateDate(d:string) {
    if (d ==="0001-01-01T00:00:00"){
      return "";
    }else{
      return d;
    }
  }

  buscar(){     
   
      this.problemasFiltrados = Base.Filtrar(this.problemas,this.nombreProblema);
    
   }

   key: string= 'FechaAltaProblema';
   reverse:boolean = false;
   sort(key: string){
    this.key =key;
    this.reverse = !this.reverse;
   }
 
}
