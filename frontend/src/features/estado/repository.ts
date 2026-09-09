import type { Estado } from '@/features/estado/domain';

export interface EstadoRepository {
    getAll(): Promise<Estado[] | null>;
}
