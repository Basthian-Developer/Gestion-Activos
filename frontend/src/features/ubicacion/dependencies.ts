import { JsonRepository } from '@/features/ubicacion/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/ubicacion/infrastructure/ApiRepository';
import type { UbicacionRepository } from '@/features/ubicacion/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const ubicacionRepository: UbicacionRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
