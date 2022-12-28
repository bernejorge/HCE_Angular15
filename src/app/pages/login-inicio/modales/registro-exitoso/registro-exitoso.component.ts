import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-exitoso',
  templateUrl: './registro-exitoso.component.html',
  styleUrls: ['./registro-exitoso.component.css']
})
export class RegistroExitosoComponent implements OnInit {
  @Input() email:string ="";
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
