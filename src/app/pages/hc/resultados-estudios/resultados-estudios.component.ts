import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Base } from '../../../Models/BaseModel';
import { Informe } from '../../../Models/Informe';
import { PersonasService } from '../../../services/personas.service';
import { ModalComponent } from '../resultados-estudios-modales/modal/modal.component';

@Component({
  selector: 'app-resultados-estudios',
  templateUrl: './resultados-estudios.component.html',
  styleUrls: ['./resultados-estudios.component.css']
})
export class ResultadosEstudiosComponent implements OnInit, OnDestroy {

  informes!: Informe[];
  informesFiltrados?: Informe[];
  suscripcion!: Subscription;
  strBuscar!: string;
  p: number = 1;
  cantidad: number = 10;
  constructor(private personaSrv: PersonasService, private modalService: NgbModal) {

  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit() {
    this.suscripcion = this.personaSrv.$personaSeleccionadaObs
      .subscribe((res) => {
        if (res)
          this.getData()
      });
  }

  getData() {
    this.personaSrv.obtenerInformes()
      .subscribe((res) => {
        console.log(res);
        this.informes = res.Informes.map(x => Object.assign(new Informe(), x));
        this.informesFiltrados = this.informes;
      })
  }

  buscar() {
    this.informesFiltrados = Base.Filtrar(this.informes, this.strBuscar);
  }

  openModal(inf: Informe) {
    let informeCompleto: Informe;
    this.personaSrv.obtenerInformesPorId(inf.Id)
      .subscribe((res) => {
        if (res.Informes) {
          console.log(res);
          informeCompleto = res.Informes.map(x => Object.assign(new Informe(), x))[0];
          const modalRef = this.modalService.open(ModalComponent, { size: 'lg' });
          modalRef.componentInstance.estudio = informeCompleto;
        }
      }
      )
    console.log(inf.Id, + "  " + inf.Estudio);
  }

  key: string = 'FechaRealizacion';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
