import { Base } from "./BaseModel";

export interface IPrescripcion extends Base {
    Id:                    number;
    Fecha:                 Date;
    TratamientoProlongado: boolean;
    Vencimiento:           Date;
    Dias:                  number;
    Nombre:                string;
    IndicacionMedica:      string;
    EstadoPrescripcion:    string;
    FechaMostrar:          Date;
    Problema:              string;
    obtenerClass(): string;
   
}

export class Prescripcion implements IPrescripcion {
    public getDataToFilter(): string {
       return this.Nombre;
    }
   
   
    Id!: number;
    Fecha!: Date;
    TratamientoProlongado!: boolean;
    Vencimiento!: Date;
    Dias!: number;
    Nombre!: string;
    IndicacionMedica!: string;
    EstadoPrescripcion!: string;
    FechaMostrar!: Date;
    Problema!: string;
    
    public obtenerClass(): string {

        switch (this.EstadoPrescripcion) {
            case "Activo":
                return 'estadoPrescripcion--activo';
               
            case "Vencido":
                return 'estadoPrescripcion--vencido';

            case "Suspendido":
                return 'estadoPrescripcion--inactivo';

            case "Finalizado":
                return 'estadoPrescripcion--finalizado';

            default:
                return 'estadoPrescripcion--indefinido';
        }

     
        
       
            // if (this.IndicacionMedica == 'FINALIZADA'){
            //     return 'estadoPrescripcion--finalizado';
            // } else if(this.IndicacionMedica == 'SUSPENDIDO'){
            //     return 'estadoPrescripcion--inactivo';
            // }else{
            //     return 'estadoPrescripcion--indefinido';;
            // }
        
    
        // if($indicacionMedica == 'ACTIVA'){
        //     if($estadoPrescripcion == 'VENCIDO'){
        //                             <td class="estatusBolita" title="Estado del medicamento en Sistema: ACTIVO -> VENCIDO"><img src="assets/images/estadomed/vencido.png">
        //                                 <span style="display:none;">Activo</span>
        //                             </td>
        //                     </tr>';
        //     } else {
        
        //                         <td class="estatusBolita" title="Estado del medicamento en Sistema: ACTIVO"><img src="assets/images/estadomed/activo.png">
        //                             <span style="display:none;">Activo</span>
        //                         </td>
        //     };
        // } else if ($soloActivos != true){
        //     $i++;
        //     if ($indicacionMedica == 'FINALIZADA'){
        //         $contenidoConsultas .= '
        //                         <td class="estatusBolita" title="Estado del medicamento en Sistema: FINALIZADO"><img src="assets/images/estadomed/finalizado.png">
        //                         <span style="display:none;">Finalizado</span>
        //                         </td>
        //                 </tr>';
        //     } else if ($indicacionMedica == 'SUSPENDIDO'){
        //                         <td class="estatusBolita" title="Estado del medicamento en Sistema: SUSPENDIDO"><img src="assets/images/estadomed/suspendido.png">
        //                             <span style="display:none;">Finalizado</span>
        //                         </td>
        //                 </tr>';
        //     } else {
        //                         <td class="estatusBolita" title="Estado del medicamento en Sistema: SIN REGISTRO">-
        //                             <span style="display:none;">Finalizado</span>
        //                         </td>
        //                 </tr>';
        //     };
        // }
    }

    
}

