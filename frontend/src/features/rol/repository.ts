import type { Rol } from '@/features/rol/domain';

export interface RolRepository {
    getAll(): Promise<Rol[] | null>;
}
