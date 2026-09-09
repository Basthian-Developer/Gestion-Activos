import type { HistorialActivo } from '@/features/historial_activo/domain';

export interface HistorialActivoRepository {
    getAll(): Promise<HistorialActivo[] | null>;
}
