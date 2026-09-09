import { JsonRepository } from '@/features/estado/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/estado/infrastructure/ApiRepository';
import type { EstadoRepository } from '@/features/estado/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const estadoRepository: EstadoRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
