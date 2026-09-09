import { JsonRepository } from '@/features/asignacion/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/asignacion/infrastructure/ApiRepository';
import type { AsignacionRepository } from '@/features/asignacion/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const asignacionRepository: AsignacionRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
