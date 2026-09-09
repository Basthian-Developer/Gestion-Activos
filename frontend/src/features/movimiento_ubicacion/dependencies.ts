import { JsonRepository } from '@/features/movimiento_ubicacion/infrastructure/JsonRepository';
import { ApiRepository } from '@/features/movimiento_ubicacion/infrastructure/ApiRepository';
import type { MovimientoUbicacionRepository } from '@/features/movimiento_ubicacion/repository';

const mode = import.meta.env.VITE_BUILD_MODE;

export const movimientoUbicacionRepository: MovimientoUbicacionRepository =
    mode === "demo"
    ? new JsonRepository()
    : new ApiRepository();
