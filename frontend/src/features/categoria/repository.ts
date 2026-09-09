import type { Categoria } from '@/features/categoria/domain';

export interface CategoriaRepository {
    getAll(): Promise<Categoria[] | null>;
}
