import type { ReparacionRepository } from '@/features/reparacion/repository';
import type { Reparacion } from '@/features/reparacion/domain';
import reparaciones from '@/data/reparacion.json';

export class JsonRepository implements ReparacionRepository {
    async getAll(): Promise<Reparacion[] | null> {
        return reparaciones;
    }

    async getById(id: number): Promise<Reparacion | null> {
        return reparaciones.find(item => item.id === id) ?? null;
    }
}
