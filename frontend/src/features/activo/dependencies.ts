import { JsonRepository } from '@/features/activo/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/activo/infrastructure/ApiRepository';
import type { ActivoRepository } from '@/features/activo/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const activoRepository: ActivoRepository = 
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();