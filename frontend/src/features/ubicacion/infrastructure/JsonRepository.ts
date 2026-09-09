import type { UbicacionRepository } from '@/features/ubicacion/repository';
import type { Ubicacion } from '@/features/ubicacion/domain';
import ubicaciones from '@/data/ubicacion.json';

export class JsonRepository implements UbicacionRepository {
    async getAll(): Promise<Ubicacion[] | null> {
        return ubicaciones;
    }

    async getById(id: number): Promise<Ubicacion | null> {
        return ubicaciones.find(item => item.id === id) ?? null;
    }
}
