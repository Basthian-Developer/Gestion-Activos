import type { CategoriaRepository } from '@/features/categoria/repository';
import type { Categoria } from '@/features/categoria/domain';
import categorias from '@/data/categoria.json';

export class JsonRepository implements CategoriaRepository {
    async getAll(): Promise<Categoria[] | null> {
        return categorias;
    }

    async getById(id: number): Promise<Categoria | null> {
        return categorias.find(item => item.id === id) ?? null;
    }
}
