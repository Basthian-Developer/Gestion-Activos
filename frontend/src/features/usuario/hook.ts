import { useState, useEffect } from 'react';
import type { Usuario } from '@/features/usuario/domain';
import { usuarioRepository } from '@/features/usuario/dependencies';

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsuarios = async () => {
            try {
                const data = await usuarioRepository.getAll();
                setUsuarios(data ?? []);
            } catch {
                setError('Error al cargar los usuarios');
            } finally {
                setLoading(false);
            }
        };

        loadUsuarios();
    }, []);

    return {
        usuarios, loading, error
    };
}
