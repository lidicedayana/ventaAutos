export interface Cliente{
    codigo: string;
    nombre?: string;
    apellido?: string;
    password?: string;
    quiereContacto: boolean;
    email?: string | null;
    telefono?: string | null;
}