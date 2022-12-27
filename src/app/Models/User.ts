export interface User {
    Nombre: string;
    Id: number;
    Registrado: boolean;
    Confirmado: boolean;
    Vinculos: Vinculo[];
    Thumbnail?: any;
    IdTarjeta: number;
    AccessToken: string;
}

export interface Vinculo {
    IdTipoVinculo: number;
    NombreTipoVinculo: string;
    IdExterno: number;
    IdPerfilUsuarioVinculador: number;
}