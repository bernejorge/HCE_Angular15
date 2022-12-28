import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.css']
})
export class TerminosCondicionesComponent implements OnInit {

  constructor(private httpClient: HttpClient, public activeModal: NgbActiveModal) { }
  terms!: string;
  ngOnInit() {

    const observador ={
      next: (res: any)=>{
        console.log(res);
        this.terms = res;
      },
      error: (err: any)=>{
        console.log(err);
      },
    }

    this.httpClient.get('./assets/terminos.txt', { responseType: 'text' })
      .subscribe(observador);
  }

  Cerrar(){
    this.activeModal.close();
  }
}
