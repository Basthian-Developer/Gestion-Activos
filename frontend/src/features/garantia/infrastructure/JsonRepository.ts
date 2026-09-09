import type { GarantiaRepository } from '@/features/garantia/repository';
import type { Garantia } from '@/features/garantia/domain';
import garantias from '@/data/garantia.json';

export class JsonRepository implements GarantiaRepository {
    async getAll(): Promise<Garantia[] | null> {
        return garantias;
    }

    async getById(id: number): Promise<Garantia | null> {
        return garantias.find(item => item.id === id) ?? null;
    }
}
