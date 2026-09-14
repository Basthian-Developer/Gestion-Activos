import type computador from "@/models/Computador";
import type repository from "@/repositories/interfaces/ComputerRepository";

export default class JsonComputerRepository implements repository {
    async getAll(): Promise<computador[]> {
        const response = await fetch(`${import.meta.env.BASE_URL}data/computadores.json`);

        if(!response.ok){
            throw new Error("Error al obtener la lista de computadores")
        }

        const data = await response.json();

        if(!Array.isArray(data)){
            throw new Error("Solo se permiten arreglos en la consulta de computadores");
        }

        return data;
    }

    async getById(id: number): Promise<computador | null> {
        const computadores = await this.getAll()
        return computadores.find(c => c.id === id) ?? null;
    }
}