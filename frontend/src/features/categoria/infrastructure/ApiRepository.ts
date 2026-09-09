import type { CategoriaRepository } from '@/features/categoria/repository';
import type { Categoria } from '@/features/categoria/domain';

export class ApiRepository implements CategoriaRepository {
    async getAll(): Promise<Categoria[] | null> {
        const response = await fetch("/api/categorias/get_all");

        if (!response.ok) {
            throw new Error(`Error al obtener las categorías: ${response.status}`);
        }

        return await response.json() as Categoria[];
    }
}
