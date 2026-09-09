import type { EstadoRepository } from '@/features/estado/repository';
import type { Estado } from '@/features/estado/domain';
import estados from '@/data/estado.json';

export class JsonRepository implements EstadoRepository {
    async getAll(): Promise<Estado[] | null> {
        return estados;
    }

    async getById(id: number): Promise<Estado | null> {
        return estados.find(item => item.id === id) ?? null;
    }
}
