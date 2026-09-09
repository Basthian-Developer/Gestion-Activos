import type { UsuarioRepository } from '@/features/usuario/repository';
import type { Usuario } from '@/features/usuario/domain';
import usuarios from '@/data/usuario.json';

export class JsonRepository implements UsuarioRepository {
    async getAll(): Promise<Usuario[] | null> {
        return usuarios;
    }

    async getById(id: number): Promise<Usuario | null> {
        return usuarios.find(item => item.id === id) ?? null;
    }
}
