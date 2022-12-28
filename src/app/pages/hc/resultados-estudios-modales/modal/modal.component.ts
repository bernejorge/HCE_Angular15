import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Informe } from '../../../../Models/Informe';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() estudio!: Informe;
  titulo: string = '';
  canPrint: boolean = false;
  constructor(public activeModal: NgbActiveModal) {

  }


  ngOnInit() {
    if (this.estudio) {
      if (this.estudio.NombrePlantilla !== null && this.estudio.NombrePlantilla !== '') {
        this.titulo = this.estudio.NombrePlantilla;
      } else if (this.estudio !== null) {
        this.titulo = this.estudio.Estudio;
      } else {
        this.titulo = "";
      }
      this.canPrint = true;
    }
  }
  addTituloHijo(subTitulo: string) {
    this.titulo = this.titulo + " " + subTitulo;
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
