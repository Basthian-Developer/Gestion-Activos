import type { EstadoRepository } from '@/features/estado/repository';
import type { Estado } from '@/features/estado/domain';

export class ApiRepository implements EstadoRepository {
    async getAll(): Promise<Estado[] | null> {
        const response = await fetch("/api/estados/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener los estados: ${response.status}`);
        }

        return await response.json() as Estado[];
    }
}
