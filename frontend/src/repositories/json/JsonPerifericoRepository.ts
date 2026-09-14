import type periferico from "@/models/Periferico";
import type repository from "@/repositories/interfaces/PerifericoRepository";

export default class JsonPerifericoRepository implements repository {
    async getAll(): Promise<periferico[]> {
        const response = await fetch(`${import.meta.env.BASE_URL}data/perifericos.json`);

        if (!response.ok) {
            throw new Error("Error al consultar los perifericos");
        }

        const data = await response.json();

        if(!Array.isArray(data)){
            throw new Error("Solo se permiten arreglos al consultar los perifericos");
        }

        return data;
    }

    async getById(id: number): Promise<periferico | null> {
        const periferico = await this.getAll()
        return periferico.find(p => p.id === id) ?? null;
    }
}