import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Chart } from 'angular-highcharts';
import { Subscription } from 'rxjs';
import { Base } from '../../../Models/BaseModel';
import { Episodio } from '../../../Models/Episodio';
import { Informe } from '../../../Models/Informe';
import { Prescripcion } from '../../../Models/Prescripcion';
import { RespuestaPrescripcion } from '../../../Models/RespuestasInterfaces';
import { SignosVitales } from '../../../Models/SignosVitales';
import { PersonasService } from '../../../services/personas.service';
import { SpinnerService } from '../../../services/spinner.service';
import { ModalComponent } from '../resultados-estudios-modales/modal/modal.component';


@Component({
  selector: 'app-resumen-clinico',
  templateUrl: './resumen-clinico.component.html',
  styleUrls: ['./resumen-clinico.component.css']
})
export class ResumenClinicoComponent implements OnInit, OnDestroy {

  signos?: SignosVitales[];
  suscripcion!: Subscription;
  serieSistolica?: any[];
  serieDiastolica?: any[];
  serieFrqCardiaca?: number[];
  chart!: Chart;
  categorias!: any[] ;
  episodios?: Episodio[];
  prescripciones?: Prescripcion[];
  informes?: Informe[];

  constructor(private personaSrv: PersonasService, public datepipe: DatePipe, private modalService: NgbModal) { }
  
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
    this.cargarSignosVitales();
    this.cargarInternaciones();
    this.cargarMedicamentos();
    this.cargarEstudios();
  }
  validateDate(date: Date): string {
    const dateStr =  this.datepipe.transform(date, "yyyy-MM-ddThh:mm:ssZZZZZ");
    return Base.validateDate(dateStr);
  }
  cargarMedicamentos() {
    this.personaSrv.obtenerMedicacion()
      .subscribe((res: RespuestaPrescripcion) => {
        console.log(res);
        this.prescripciones = res.Prescripciones.map(x => Object.assign(new Prescripcion(), x))
          .sort((a, b) => {
            return new Date(b.Fecha).getTime() - new Date(a.Fecha).getTime();
          }) //ordernados mas nuevos primeros
          .slice(0,10); //solo 10 registros
      });
  }

  cargarEstudios(){
    this.personaSrv.obtenerInformes()
      .subscribe((res) => {
        console.log(res);
        this.informes = res.Informes.map(x => Object.assign(new Informe(), x))
          .sort((a, b) => {
            return new Date(b.FechaRealizacion).getTime() - new Date(a.FechaRealizacion).getTime();
          }) //ordernados mas nuevos primeros
          .slice(0,10); //solo 10 registros
      });
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

  cargarInternaciones() {
    this.personaSrv.obtenerEpisodios()
      .subscribe(
        (res) => {
          console.log(res);
          this.episodios = res.Episodios.map(x => Object.assign(new Episodio(), x));
          if (this.episodios) {
            this.episodios = this.episodios
            .filter(obj => {
              return obj.MotivoInternacion !== ""
            })            
            .sort((a, b) => {
              return new Date(b.FechaIngreso).getTime() - new Date(a.FechaIngreso).getTime();
            }) //ordernados mas nuevos primeros
            .slice(0,10); //solo 10 registros
              ; //obtener ultimos 10 registros, mas nuevos primeros
          }
        }
      );

  }
  cargarSignosVitales() {
    this.personaSrv.obtenerSignosVitales()
      .subscribe(res => {
        console.log(res);
        this.signos = res.SignosVitales.slice(-100)
          .sort((a, b) => {
            return new Date(a.Fecha).getTime() - new Date(b.Fecha).getTime();
          });; //res.Problemas.map(x=> Object.assign(new Problema(),x));
        this.serieDiastolica = this.signos.map(x => [new Date(x.Fecha).getTime(), x.FrecuenciaDiastolica]);
        this.serieSistolica = this.signos.map(x => [new Date(x.Fecha).getTime(), x.FrecuenciaSistolica]);
        //this.serieFrqCardiaca = this.signos.map(x =>  [ x.Fecha, x.FrecuenciaDiastolica]);
        this.categorias = this.signos.map(x => this.datepipe.transform(x.Fecha, 'MMM-yy'));

        this.chart = new Chart({
          lang: {
            downloadJPEG: 'Descargar gráfico en JPG',
            downloadPNG: 'Descargar gráfico en PNG',
            downloadPDF: 'Descargar gráfico en PDF',
            downloadSVG: 'Gráfico vectorizado SVG',
            printChart: 'Imprimir gráfico',
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            resetZoom: 'Grafico completo',
          },
          chart: {
            type: 'line'
          },
          title: {
            text: 'Linechart'
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
              millisecond: '%H:%M:%S.%L',
              second: '%H:%M:%S',
              minute: '%H:%M',
              hour: '%H:%M',
              day: '%e. %b',
              week: '%e. %b',
              month: '%b \'%y',
              year: '%Y'
            },
            title: {
              text: 'Fecha de medición',
              style: {
                color: '#ccc',
                fontWeight: 'normal',
                fontSize: '10px',
              },
            }
          },
          credits: {
            enabled: false
          },
          tooltip: {
            xDateFormat: '%d-%m-%Y %H:%M:%S',
            //crosshairs: { color: '#cccccc', dashStyle: 'shortdot' },
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
              '<td style="text-align: right"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',

            dateTimeLabelFormats: {
              week: 'Semana de %d-%m-%Y'
            }
          },
         
          series: [
            {
              type: 'line',
              name: 'Sistolica',
              data: this.serieSistolica,
            },
            {
              type: 'line',
              name: 'Diastolica',
              data: this.serieDiastolica
            }
          ]
        });
      });
  }



  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }

}
