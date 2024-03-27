import { Cliente } from "../modelos/Cliente";

export interface RespuestaCliente {
    codigo: string;
    mensaje: string;
    data: Array<Cliente>|Cliente|any;
    rows: number;
    pages: number;
    records: number;
    page: number;
}