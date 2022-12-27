import { Base } from "./BaseModel";

export interface InformeIterface extends Base{
    NombrePlantilla: string;
    Estudio: string;
    Nasector: string;
    FechaRealizacion: Date;
    Id: number;
    ClaveInforme: number;
    Id_Rec_realiza: number;
    Id_rec_Firma: number;
    IdPersona: number;
    ClaveUnica: number;
    Mostrar: string;
    IdPlantilla: number;
    EstadoDescripcion: string;
    OrdenLaboratorio: number;
    HoraEstudio: number;
    HoraNormalizada: string;
    TieneImagenDigital: boolean;
    InformeCritico: number;
    InformeCriticoLeido: number;
    TipoInforme: string;
    NombrePersona: string;
    NombreInforme: string;
    Sexo: string;
    Edad: string;
    Laboratorio: Laboratorio[];
    Imagen: Imagen[];
    Otro: Laboratorio[];
    getClass(): string;
}

export interface Imagen {
    DeterminacionNombre: string;
    Valor: string;
    Referencia: string;
    Modalidad: string;
    IdDeterminacionTipoValor: number;
}

export interface Laboratorio {
    Descripcion: string;
    Valor: string;
    ReferenciaCompleta: string;
    AnalisisNombre: string;
    Etiqueta: string;
    Unidad: string;
    ValorNormal: string;
}

export class Informe implements InformeIterface {
    public getDataToFilter(): string {
        return this.Estudio;
    }
    NombrePlantilla!: string;
    Estudio!: string;
    Nasector!: string;
    FechaRealizacion!: Date;
    Id!: number;
    ClaveInforme!: number;
    Id_Rec_realiza!: number;
    Id_rec_Firma!: number;
    IdPersona!: number;
    ClaveUnica!: number;
    Mostrar!: string;
    IdPlantilla!: number;
    EstadoDescripcion!: string;
    OrdenLaboratorio!: number;
    HoraEstudio!: number;
    HoraNormalizada!: string;
    TieneImagenDigital!: boolean;
    InformeCritico!: number;
    InformeCriticoLeido!: number;
    TipoInforme!: string;
    NombrePersona!: string;
    NombreInforme!: string;
    Sexo!: string;
    Edad!: string;
    Laboratorio!: Laboratorio[];
    Imagen!: Imagen[];
    Otro!: Laboratorio[];

    getClass(): string {

        switch (this.TipoInforme) {
            case "Laboratorio":
                return "fa fa-flask";
                
            case "2":                
                return "fa fa-tint";
                
            case "3":                
                return "fa fa-puzzle-piece";
               
            case "Imagen":                
                return "fa fa-file-text";
               
            case "8":                
                return "fa fa-eyedropper";
                
            default:
                return "fa fa-eye-slash";
        }
       
    }





    // else if ($EstudiosTipoOrigen == '8') {
    //     $linkEstudio = 'javascript:flacghhldghh31k6('.$idInf.','.$idPlantilla.','.$ClaveUnica.','.$nomPlantilla.','.$newFechaRealizacion.');return false;';
    //     $iconoEstudio = '<span style="display:none;">Estudios de Anatomía Patológica</span><i class=""></i>';
    // }

    // else {
    //     $linkEstudio = 'javascript:flacghhldghh31k7();return false;';
    //     $iconoEstudio = '<span style="display:none;">Estudio no disponible para su visualización en Historia Clínica Web</span><i class="fa fa-eye-slash"></i>';
    // }



}