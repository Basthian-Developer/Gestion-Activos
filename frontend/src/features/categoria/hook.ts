import { useState, useEffect } from 'react';
import type { Categoria } from '@/features/categoria/domain';
import { categoriaRepository } from '@/features/categoria/dependencies';

export function useCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategorias = async () => {
            try {
                const data = await categoriaRepository.getAll();
                setCategorias(data ?? []);
            } catch {
                setError('Error al cargar las categorías');
            } finally {
                setLoading(false);
            }
        };

        loadCategorias();
    }, []);

    return {
        categorias, loading, error
    };
}
