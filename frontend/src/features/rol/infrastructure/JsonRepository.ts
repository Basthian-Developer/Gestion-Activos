import type { RolRepository } from '@/features/rol/repository';
import type { Rol } from '@/features/rol/domain';
import roles from '@/data/rol.json';

export class JsonRepository implements RolRepository {
    async getAll(): Promise<Rol[] | null> {
        return roles;
    }

    async getById(id: number): Promise<Rol | null> {
        return roles.find(item => item.id === id) ?? null;
    }
}
