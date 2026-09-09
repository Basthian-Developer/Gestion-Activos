import type { MovimientoUbicacion } from '@/features/movimiento_ubicacion/domain';

export interface MovimientoUbicacionRepository {
    getAll(): Promise<MovimientoUbicacion[] | null>;
}
