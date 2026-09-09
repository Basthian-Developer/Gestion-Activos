export interface Reparacion {
    id: number;
    created_at: string;
    observacion: string;
    check_date: string;
    estado: string;
    falla: string;
    componentes: string;
    activo_id: number;
    usuario_id: number;
}
