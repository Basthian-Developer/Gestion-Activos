import type { HistorialActivoRepository } from '@/features/historial_activo/repository';
import type { HistorialActivo } from '@/features/historial_activo/domain';

export class ApiRepository implements HistorialActivoRepository {
    async getAll(): Promise<HistorialActivo[] | null> {
        const response = await fetch("/api/historiales_activos/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener los historiales de activos: ${response.status}`);
        }

        return await response.json() as HistorialActivo[];
    }
}
