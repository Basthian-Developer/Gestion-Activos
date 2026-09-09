import type { Ubicacion } from '@/features/ubicacion/domain';

export interface UbicacionRepository {
    getAll(): Promise<Ubicacion[] | null>;
}
