import { Vehiculo } from "./Vehiculo";

export interface Respuesta{
    codigo: string;
    mensaje: string;
    data: Array<Vehiculo>|Vehiculo|any;
    rows: number;
    pages: number;
    records: number;
    page: number;
}