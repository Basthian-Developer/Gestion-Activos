import { JsonRepository } from '@/features/categoria/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/categoria/infrastructure/ApiRepository';
import type { CategoriaRepository } from '@/features/categoria/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const categoriaRepository: CategoriaRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
