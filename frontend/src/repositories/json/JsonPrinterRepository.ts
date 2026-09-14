import type impresora from "@/models/Impresora";
import type repository from "@/repositories/interfaces/PrinterRepository";

export default class JsonPrinterRepository implements repository {
    async getAll(): Promise<impresora[]> {
        const response = await fetch(`${import.meta.env.BASE_URL}data/impresoras.json`);

        if (!response.ok) {
            throw new Error("Error al consultar las impresoras");
        }

        const data = await response.json();

        if(!Array.isArray(data)){
            throw new Error("Solo se permiten arreglos al consultar las impresoras")
        }

        return data;
    }

    async getById(id: number): Promise<impresora | null> {
        const impresora = await this.getAll()
        return impresora.find(i => i.id === id) ?? null;
    }
}