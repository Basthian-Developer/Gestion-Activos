import { JsonRepository } from '@/features/reparacion/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/reparacion/infrastructure/ApiRepository';
import type { ReparacionRepository } from '@/features/reparacion/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const reparacionRepository: ReparacionRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
