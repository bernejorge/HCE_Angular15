export interface Persona {
    Id: number;
    Nombre: string;
    Apellido: string;
    NombreCompleto: string;
    TipoDocumento: number;
    NumeroDocumento: string;
    Sexo: string;
    FechaNacimiento: Date;
    HC: string;
    IdTipoRelacion: number;
    TipoRelacion: string;
    Foto: string;
    FotoBase64: string;
    Edad: number;
    EstadoCivil?: any;
    Telefono?: any;
    Celular?: any;
    EMail?: any;
}