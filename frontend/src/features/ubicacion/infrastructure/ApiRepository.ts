import type { UbicacionRepository } from '@/features/ubicacion/repository';
import type { Ubicacion } from '@/features/ubicacion/domain';

export class ApiRepository implements UbicacionRepository {
    async getAll(): Promise<Ubicacion[] | null> {
        const response = await fetch("/api/ubicaciones/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener las ubicaciones: ${response.status}`);
        }

        return await response.json() as Ubicacion[];
    }
}
