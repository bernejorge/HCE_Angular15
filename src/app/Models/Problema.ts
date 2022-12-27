import { Base } from "./BaseModel";

export interface ProblemaInterface extends Base {
    Problema:             string;
    FechaAltaProblema:    Date;
    ProblemaTipoEstado:   string;
    Medico:               string;
    MedicoServicio:       string;
    FechaUltimaEvolucion: Date;
    ResaltarEnHCE:        boolean;

    
}

export class Problema implements ProblemaInterface {
    getDataToFilter(): string {
        return this.Problema;
    }

   
    Problema!: string;
    FechaAltaProblema!: Date;
    ProblemaTipoEstado!: string;
    Medico!: string;
    MedicoServicio!: string;
    FechaUltimaEvolucion!: Date;
    ResaltarEnHCE!: boolean;

}