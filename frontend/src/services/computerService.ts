import { computerRepository, activoRepository } from '@/config/dependencias'

export async function getAll() {
    const [activos, computadores] = await Promise.all([
        activoRepository.getAll(),
        computerRepository.getAll()
    ]);

    return computadores?.map(computador => {
        const activo = activos?.find(a => a.id === computador.activo_id);

        return {
            ...computador,
            ...activo,
            id: computador.id
        }
    });
}

export async function getById(id: number) {
    const computador = await computerRepository.getById(id)

    if (!computador) return undefined

    const activo = await activoRepository.getById(computador.activo_id)

    return {
        ...computador,
        ...activo,
        id: computador.id
    };
}