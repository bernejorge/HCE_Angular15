import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasService } from './personas.service';
import { MenuService } from './menu.service';
import { SpinnerService } from './spinner.service';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SesionPermisosGuard } from '../guards/sesion-permisos.guard';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ // components that we want to make available
    ],
    declarations: [ // components for use in THIS module
    ],
    providers: [ // singleton services
        PersonasService,
        MenuService,
        SpinnerService,
        FormsModule,
        NgbActiveModal,
        SesionPermisosGuard,

    ]
})
export class CoreModule { }