import { Base } from "./BaseModel";

export interface ITurno extends Base {
    Id:            string;
    Docuemnto:     string;
    TipoDocuemnto: string;
    Nombre:        string;
    Telefono:      string;
    Fecha:         string;
    Hora:          string;
    Medico:        string;
    Especialidad:  string;
    Lugar:         string;
}

export class Turno implements ITurno {
    public getDataToFilter(): string {
       return this.Especialidad + " " + this.Medico;
    }
    Id!: string;
    Docuemnto!: string;
    TipoDocuemnto!: string;
    Nombre!: string;
    Telefono!: string;
    Fecha!: string;
    Hora!: string;
    Medico!: string;
    Especialidad!: string;
    Lugar!: string;    
}
