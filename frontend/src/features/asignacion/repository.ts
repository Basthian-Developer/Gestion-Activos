import type { Asignacion } from '@/features/asignacion/domain';

export interface AsignacionRepository {
    getAll(): Promise<Asignacion[] | null>;
}
