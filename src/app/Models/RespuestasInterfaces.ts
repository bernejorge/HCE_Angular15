
import { EpicrisisInterface } from "./Epicrisis";
import { Episodio } from "./Episodio";
import { Informe } from "./Informe";
import { Mensaje } from "./Mensaje";
import { IPrescripcion, Prescripcion } from "./Prescripcion";
import { Problema } from "./Problema";
import { SignosVitales } from "./SignosVitales";
import { ITurno } from "./Turnos";

export interface RespuestaProblemas {
    Problemas: Problema[];
    Codigo: number;
    Mensaje: string;
    IdRequest: string;
    Exito: boolean;
    Mensajes: Mensaje[];
    HasException: boolean;
}

export interface RespuestaPrescripcion {
    Prescripciones: Prescripcion[];
    Codigo: number;
    Mensaje: string;
    IdRequest: string;
    Exito: boolean;
    Mensajes: Mensaje[];
    HasException: boolean;
}

export interface RespuestaTurnos {
    Evento: string;
    Documento: string;
    TipoDocumento: string;
    Nombre: string;
    Telefono: string;
    Turnos: ITurno[];
    Codigo: number;
    Mensaje: string;
    IdRequest: string;
    Exito: boolean;
    Mensajes: Mensaje[];
    HasException: boolean;
}

export interface RespuestaInformes {
    Informes: Informe[];
    Codigo: number;
    Mensaje: string;
    IdRequest: string;
    Exito: boolean;
    Mensajes: Mensaje[];
    HasException: boolean;
}

export interface RespuestaEpisodios {
    Episodios: Episodio[];
    Codigo: number;
    Mensaje: string;
    IdRequest: string;
    Exito: boolean;
    Mensajes: Mensaje[];
    HasException: boolean;
}

export interface RespuestaEpicrisis {
    Epicrisis: EpicrisisInterface[];
    Codigo: number;
    Mensaje: string;
    IdRequest: string;
    Exito: boolean;
    Mensajes: Mensaje[];
    HasException: boolean;
}

export interface RespuestaSignosVitales {
    SignosVitales: SignosVitales[];
    Codigo:        number;
    Mensaje:       string;
    IdRequest:     string;
    Exito:         boolean;
    Mensajes:      Mensaje[];
    HasException:  boolean;
}