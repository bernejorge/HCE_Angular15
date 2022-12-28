import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Informe } from '../../../../Models/Informe';

@Component({
  selector: 'app-estudios-imgen',
  templateUrl: './estudios-imgen.component.html',
  styleUrls: ['./estudios-imgen.component.css']
})
export class EstudiosImgenComponent implements OnInit {
  @Input() estudio!: Informe;
  @Output() miTitulo = new EventEmitter<string>();
  titulo: string ='';
  subTitulo: string = '';
  descripcion: string = '';
  valor: string = '';
  constructor() { }

  ngOnInit() {
    if (this.estudio.Imagen) {
      
      for (let index = 0; index < this.estudio.Imagen.length; index++) {
        const element = this.estudio.Imagen[index];
        if (element.IdDeterminacionTipoValor==12){
          this.titulo = element.DeterminacionNombre;
          this.descripcion = element.Valor;
          this.subTitulo = element.Modalidad
        }        
      }    
      this.miTitulo.emit(this.subTitulo);    
    }    
  }



}
