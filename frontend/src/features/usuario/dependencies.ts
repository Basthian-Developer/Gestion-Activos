import { JsonRepository } from '@/features/usuario/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/usuario/infrastructure/ApiRepository';
import type { UsuarioRepository } from '@/features/usuario/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const usuarioRepository: UsuarioRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
