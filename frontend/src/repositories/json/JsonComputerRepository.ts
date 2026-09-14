import type computador from "@/models/Computador";
import type repository from "@/repositories/interfaces/ComputerRepository";

export default class JsonComputerRepository implements repository {
    async getAll(): Promise<computador[] | null> {
        const response = await fetch(`${import.meta.env.BASE_URL}data/computadores.json`);

        if(!response){
            throw new Error("Error al obtener la lista de computadores")
        }

        return response.json();
    }

    async getById(id: number): Promise<computador | null> {
        const computadores = await this.getAll()
        return computadores?.find(c => c.id === id) ?? null;
    }
}