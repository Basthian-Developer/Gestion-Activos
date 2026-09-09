import type { ActivoRepository } from '@/features/activo/repository';
import type { Activo } from '@/features/activo/domain';
import activos from '@/data/activo.json';
import garantias from '@/data/garantia.json'
import categorias from '@/data/categoria.json'

export class JsonRepository implements ActivoRepository {
    async getAll(): Promise<Activo[] | null> {
        return activos.map(activo => ({
            ...activo,

            garantia: garantias.find(garantia => garantia.id === activo.garantia_id)?.estado ?? null,

            categoria: categorias.find(categoria => categoria.id === activo.categoria_id)?.nombre ?? null
        }));
    }

    async getById(id: number): Promise<Activo | null> {
        return activos.find(a => a.id === id) ?? null
    }
}