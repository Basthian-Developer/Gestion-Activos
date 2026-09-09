import { JsonRepository } from '@/features/rol/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/rol/infrastructure/ApiRepository';
import type { RolRepository } from '@/features/rol/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const rolRepository: RolRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
