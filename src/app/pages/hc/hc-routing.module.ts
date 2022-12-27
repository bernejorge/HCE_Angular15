import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ResumenClinicoComponent } from './resumen-clinico/resumen-clinico.component';
import { MotivoConsultaComponent } from './motivo-consulta/motivo-consulta.component';
import { InternacionesComponent } from './internaciones/internaciones.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { ResultadosEstudiosComponent } from './resultados-estudios/resultados-estudios.component';

const rutas: Routes = [
  {path: '', component:MainComponent,
    children: [
      {path:'', redirectTo:'resumen', pathMatch: 'full'},
      {path:'resumen', component:ResumenClinicoComponent},
      {path:'motivo-consulta', component: MotivoConsultaComponent},
      {path: 'profesionales', component:ProfesionalesComponent },
      {path: 'medicamentos', component:MedicamentosComponent},
      {path: 'resultados', component: ResultadosEstudiosComponent},
      {path: 'internaciones', component:InternacionesComponent},

    ],}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)
  ],
  exports:[RouterModule],
  declarations: []
})
export class HcRoutingModule { }
