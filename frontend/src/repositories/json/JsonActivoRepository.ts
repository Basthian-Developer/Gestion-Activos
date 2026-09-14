import type activo from "@/models/Activo";
import type repository from "@/repositories/interfaces/ActivoRepository";

export default class JsonActivoRepository implements repository {
    async getAll(): Promise<activo[]> {
        const response = await fetch(`${import.meta.env.BASE_URL}data/activos.json`);

        if (!response.ok) {
            throw new Error("Error al consultar los activos");
        }

        const data = await response.json();

        if(!Array.isArray(data)){
            throw new Error("Solo se permiten arreglos en la consulta de activos");
        }

        return data;
    }

    async getById(id: number): Promise<activo | null> {
        const activos = await this.getAll();

        return activos.find(a => a.id === id) ?? null;
    }
}