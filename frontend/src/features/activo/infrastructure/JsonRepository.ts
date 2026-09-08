import type { ActivoRepository } from '@/features/activo/repository';
import type { Activo } from '@/features/activo/domain';
import activos from '@/features/activo/data.json';

export class JsonRepository implements ActivoRepository {
    async getAll(): Promise<Activo[] | null> {
        return activos;
    }

    async getById(id: number): Promise<Activo | null> {
        return activos.find(a => a.id === id) ?? null
    }
}