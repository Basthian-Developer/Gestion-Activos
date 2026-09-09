import type { GarantiaRepository } from '@/features/garantia/repository';
import type { Garantia } from '@/features/garantia/domain';

export class ApiRepository implements GarantiaRepository {
    async getAll(): Promise<Garantia[] | null> {
        const response = await fetch("/api/garantias/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener las garantías: ${response.status}`);
        }

        return await response.json() as Garantia[];
    }
}
