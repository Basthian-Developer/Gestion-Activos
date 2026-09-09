import { JsonRepository } from '@/features/auth/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/auth/infrastructure/ApiRepository';
import type { AuthRepository } from '@/features/auth/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const authRepository: AuthRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
