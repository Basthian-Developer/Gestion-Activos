import type { AuthRepository } from '@/features/auth/repository';
import type { Auth } from '@/features/auth/domain';
import auths from '@/data/auth.json';

export class JsonRepository implements AuthRepository {
    async getAll(): Promise<Auth[] | null> {
        return auths;
    }

    async getById(id: number): Promise<Auth | null> {
        return auths.find(item => item.id === id) ?? null;
    }
}
