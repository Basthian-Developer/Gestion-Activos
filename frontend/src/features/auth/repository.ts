import type { Auth } from '@/features/auth/domain';

export interface AuthRepository {
    getAll(): Promise<Auth[] | null>;
}
