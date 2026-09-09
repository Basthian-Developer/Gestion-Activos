import type { ReparacionRepository } from '@/features/reparacion/repository';
import type { Reparacion } from '@/features/reparacion/domain';

export class ApiRepository implements ReparacionRepository {
    async getAll(): Promise<Reparacion[] | null> {
        const response = await fetch("/api/reparaciones/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener las reparaciones: ${response.status}`);
        }

        return await response.json() as Reparacion[];
    }
}
