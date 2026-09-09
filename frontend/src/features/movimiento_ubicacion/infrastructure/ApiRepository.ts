import type { MovimientoUbicacionRepository } from '@/features/movimiento_ubicacion/repository';
import type { MovimientoUbicacion } from '@/features/movimiento_ubicacion/domain';

export class ApiRepository implements MovimientoUbicacionRepository {
    async getAll(): Promise<MovimientoUbicacion[] | null> {
        const response = await fetch("/api/movimientos_ubicacion/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener los movimientos de ubicación: ${response.status}`);
        }

        return await response.json() as MovimientoUbicacion[];
    }
}
