import type { Reparacion } from '@/features/reparacion/domain';

export interface ReparacionRepository {
    getAll(): Promise<Reparacion[] | null>;
}
