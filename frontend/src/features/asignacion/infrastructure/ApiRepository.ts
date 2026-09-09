import type { AsignacionRepository } from '@/features/asignacion/repository';
import type { Asignacion } from '@/features/asignacion/domain';

export class ApiRepository implements AsignacionRepository {
    async getAll(): Promise<Asignacion[] | null> {
        const response = await fetch("/api/asignaciones/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener las asignaciones: ${response.status}`);
        }

        return await response.json() as Asignacion[];
    }
}
