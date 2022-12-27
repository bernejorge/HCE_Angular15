import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { ResultadosEstudiosModalComponent } from "./resultados-estudios-modal/resultados-estudios-modal.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HcRoutingModule,
    SpinnerModule,
  ],
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
    ResultadosEstudiosModalComponent,
  ],
})
export class HcModule {}
