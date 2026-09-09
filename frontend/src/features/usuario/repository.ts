import type { Usuario } from '@/features/usuario/domain';

export interface UsuarioRepository {
    getAll(): Promise<Usuario[] | null>;
}
