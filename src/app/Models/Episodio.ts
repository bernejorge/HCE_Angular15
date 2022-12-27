import { Base } from "./BaseModel";

export interface EpisodioInterface {
    Id:                   number;
    FechaIngreso:         Date;
    MotivoInternacion:    string;
    FechaDeAltaAdm:       Date;
    IdServicio:           number;
    IdCentroAtencion:     number;
    NombreServicio:       string;
    NombreCentroAtencion: string;
    IdEgresoMotivo:       number;
    IdPersona:            number;
    Sector:               string;
    TieneEpicrisis:       boolean;
    Estado:               string;
}

export class Episodio implements EpisodioInterface, Base {
    public getDataToFilter(): string {
       return this.MotivoInternacion + " " + this.NombreServicio ;
    }
    Id!: number;
    FechaIngreso!: Date;
    MotivoInternacion!: string;
    FechaDeAltaAdm!: Date;
    IdServicio!: number;
    IdCentroAtencion!: number;
    NombreServicio!: string;
    NombreCentroAtencion!: string;
    IdEgresoMotivo!: number;
    IdPersona!: number;
    Sector!: string;
    TieneEpicrisis!: boolean;
    Estado!: string;

}