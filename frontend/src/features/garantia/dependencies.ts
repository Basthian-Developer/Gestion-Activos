import { JsonRepository } from '@/features/garantia/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/garantia/infrastructure/ApiRepository';
import type { GarantiaRepository } from '@/features/garantia/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const garantiaRepository: GarantiaRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
