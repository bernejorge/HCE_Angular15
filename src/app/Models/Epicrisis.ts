export interface EpicrisisInterface {
    TextoEpicrisis: string;
    Nombre:         string;
    Orden:          number;
}

export class EpicrisisClass implements EpicrisisInterface{
    TextoEpicrisis!: string;
    Nombre!: string;
    Orden!: number;

}