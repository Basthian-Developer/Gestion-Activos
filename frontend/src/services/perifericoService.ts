import { perifericoRepository, activoRepository } from "@/config/dependencias";

export async function getAll() {
    const [perifericos, activos] = await Promise.all([
        perifericoRepository.getAll(),
        activoRepository.getAll()
    ]);

    return perifericos?.map(periferico => {
        const activo = activos?.find(a => a.id === periferico.activo_id);

        return {
            ...periferico,
            ...activo,
            id: periferico.id
        };
    });
}

export async function getById(id: number) {
    const periferico = await perifericoRepository.getById(id);

    if (!periferico) return undefined

    const activo = await activoRepository.getById(periferico.activo_id);

    if (!activo) return undefined

    return {
        ...periferico,
        ...activo,
        id: periferico.id
    }
}