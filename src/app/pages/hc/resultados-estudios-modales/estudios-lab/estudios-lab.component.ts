import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Informe } from '../../../../Models/Informe';

@Component({
  selector: 'app-estudios-lab',
  templateUrl: './estudios-lab.component.html',
  styleUrls: ['./estudios-lab.component.css']
})
export class EstudiosLabComponent implements OnInit {

  @Input() estudio!: Informe;
  @Output() miTitulo = new EventEmitter<string>();
  constructor() { 
    
  }

  ngOnInit() {
    console.log("estudios-lab.component " );
  }

}
