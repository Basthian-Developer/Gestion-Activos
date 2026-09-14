import type activo from "@/models/Activo";
import type repository from "@/repositories/interfaces/ActivoRepository";

export default class JsonActivoRepository implements repository {
    async getAll(): Promise<activo[] | null> {
        const response = await fetch(`${import.meta.env.BASE_URL}data/activos.json`);

        if (!response) {
            throw new Error("Error al consultar los activos");
        }

        return response.json();
    }

    async getById(id: number): Promise<activo | null> {
        const activos = await this.getAll();

        return activos?.find(a => a.id === id) ?? null;
    }
}