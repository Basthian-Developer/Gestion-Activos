import type { Activo } from '@/features/activo/domain';

export interface ActivoRepository {
    getAll(): Promise<Activo[] | null>;
}