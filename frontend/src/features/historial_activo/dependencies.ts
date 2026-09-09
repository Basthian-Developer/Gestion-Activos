import { JsonRepository } from '@/features/historial_activo/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/historial_activo/infrastructure/ApiRepository';
import type { HistorialActivoRepository } from '@/features/historial_activo/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const historialActivoRepository: HistorialActivoRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
