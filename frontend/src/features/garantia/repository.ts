import type { Garantia } from '@/features/garantia/domain';

export interface GarantiaRepository {
    getAll(): Promise<Garantia[] | null>;
}
