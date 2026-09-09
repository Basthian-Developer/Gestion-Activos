import type { AsignacionRepository } from '@/features/asignacion/repository';
import type { Asignacion } from '@/features/asignacion/domain';
import asignaciones from '@/data/asignacion.json';

export class JsonRepository implements AsignacionRepository {
    async getAll(): Promise<Asignacion[] | null> {
        return asignaciones;
    }

    async getById(id: number): Promise<Asignacion | null> {
        return asignaciones.find(item => item.id === id) ?? null;
    }
}
