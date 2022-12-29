import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { MainComponent } from "./main/main.component";
import { HcRoutingModule } from "./hc-routing.module";
import { ResumenClinicoComponent } from "./resumen-clinico/resumen-clinico.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { MotivoConsultaComponent } from "./motivo-consulta/motivo-consulta.component";
import { ProfesionalesComponent } from "./profesionales/profesionales.component";
import { ResultadosEstudiosComponent } from "./resultados-estudios/resultados-estudios.component";
import { MedicamentosComponent } from "./medicamentos/medicamentos.component";
import { InternacionesComponent } from "./internaciones/internaciones.component";
import { SpinnerModule } from "../spinner/spinner.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ModalComponent } from './resultados-estudios-modales/modal/modal.component';
import { EstudiosLabComponent } from './resultados-estudios-modales/estudios-lab/estudios-lab.component';
import { InternacionModalComponent } from './internaciones/internacion-modal/internacion-modal.component';
import { CardMedicamentosComponent } from './footer/card-medicamentos/card-medicamentos.component';
import { CardProfesionalesComponent } from './footer/card-profesionales/card-profesionales.component';
import { CardEstudiosComponent } from './footer/card-estudios/card-estudios.component';
import { ChartModule } from 'angular-highcharts';
import {NgxPaginationModule} from 'ngx-pagination';

import { EstudiosImgenComponent } from './resultados-estudios-modales/estudios-imagen/estudios-imgen.component';
import { OrderModule } from "ngx-order-pipe";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HcRoutingModule,
    SpinnerModule,
    ChartModule,
    OrderModule, 
    NgxPaginationModule
  ],
  providers: [DatePipe],
  declarations: [
    MainComponent,
    ResumenClinicoComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MotivoConsultaComponent,
    ProfesionalesComponent,
    ResultadosEstudiosComponent,
    MedicamentosComponent,
    InternacionesComponent,
    ModalComponent,
    EstudiosLabComponent,
    InternacionModalComponent,
    CardMedicamentosComponent,
    CardProfesionalesComponent,
    CardEstudiosComponent,
    EstudiosImgenComponent,
    
  ],
  entryComponents:[ ModalComponent, InternacionModalComponent],
  exports:[]
})
export class HcModule {}
