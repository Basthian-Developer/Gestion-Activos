import type { UsuarioRepository } from '@/features/usuario/repository';
import type { Usuario } from '@/features/usuario/domain';

export class ApiRepository implements UsuarioRepository {
    async getAll(): Promise<Usuario[] | null> {
        const response = await fetch("/api/usuarios/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener los usuarios: ${response.status}`);
        }

        return await response.json() as Usuario[];
    }
}
