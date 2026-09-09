import type { HistorialActivoRepository } from '@/features/historial_activo/repository';
import type { HistorialActivo } from '@/features/historial_activo/domain';
import historialesActivos from '@/data/historial_activo.json';

export class JsonRepository implements HistorialActivoRepository {
    async getAll(): Promise<HistorialActivo[] | null> {
        return historialesActivos;
    }

    async getById(id: number): Promise<HistorialActivo | null> {
        return historialesActivos.find(item => item.id === id) ?? null;
    }
}
