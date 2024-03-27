export interface Cliente{
    id: number;
    nombre?: string;
    apellido?: string;
    password?: string;
    quiereContacto?: boolean | null;
    email?: string | null;
    telefono?: string | null;
}