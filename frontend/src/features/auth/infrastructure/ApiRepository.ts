import type { AuthRepository } from '@/features/auth/repository';
import type { Auth } from '@/features/auth/domain';

export class ApiRepository implements AuthRepository {
    async getAll(): Promise<Auth[] | null> {
        const response = await fetch("/api/auths/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener los registros de autenticación: ${response.status}`);
        }

        return await response.json() as Auth[];
    }
}
