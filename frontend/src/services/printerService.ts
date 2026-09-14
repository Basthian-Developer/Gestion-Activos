import { printerRepository, activoRepository } from "@/config/dependencias";

export async function getAll() {
    const [impresoras, activos] = await Promise.all([
        printerRepository.getAll(),
        activoRepository.getAll()
    ]);

    return impresoras?.map(impresora => {
        const activo = activos?.find(a => a.id === impresora.activo_id);

        return {
            ...impresora,
            ...activo,
            id: impresora.id
        };
    });
}

export async function getById(id: number) {
    const impresora = await printerRepository.getById(id);

    if (!impresora) return undefined;

    const activo = await activoRepository.getById(impresora.activo_id);

    return {
        ...impresora,
        ...activo,
        id: impresora.id
    };
}