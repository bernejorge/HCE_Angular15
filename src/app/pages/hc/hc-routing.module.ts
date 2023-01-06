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
import { SesionPermisosGuard } from '../../guards/sesion-permisos.guard';

const rutas: Routes = [
  {path: '', component:MainComponent, canActivateChild:[SesionPermisosGuard],
    children: [
      
      {path:'resumen', component:ResumenClinicoComponent},
      {path:'motivo-consulta', component: MotivoConsultaComponent},
      {path: 'profesionales', component:ProfesionalesComponent },
      {path: 'medicamentos', component:MedicamentosComponent},
      {path: 'resultados', component: ResultadosEstudiosComponent},
      {path: 'internaciones', component:InternacionesComponent},
      {path:'**', redirectTo:'resumen', pathMatch: 'full'},
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
