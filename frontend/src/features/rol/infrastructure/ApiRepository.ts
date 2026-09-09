import type { RolRepository } from '@/features/rol/repository';
import type { Rol } from '@/features/rol/domain';

export class ApiRepository implements RolRepository {
    async getAll(): Promise<Rol[] | null> {
        const response = await fetch("/api/roles/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener los roles: ${response.status}`);
        }

        return await response.json() as Rol[];
    }
}
