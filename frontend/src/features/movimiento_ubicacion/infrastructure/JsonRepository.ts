import type { MovimientoUbicacionRepository } from '@/features/movimiento_ubicacion/repository';
import type { MovimientoUbicacion } from '@/features/movimiento_ubicacion/domain';
import movimientosUbicacion from '@/data/movimiento_ubicacion.json';

export class JsonRepository implements MovimientoUbicacionRepository {
    async getAll(): Promise<MovimientoUbicacion[] | null> {
        return movimientosUbicacion;
    }

    async getById(id: number): Promise<MovimientoUbicacion | null> {
        return movimientosUbicacion.find(item => item.id === id) ?? null;
    }
}
