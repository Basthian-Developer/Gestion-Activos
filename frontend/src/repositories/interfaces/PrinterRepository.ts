import type impresora from "@/models/Impresora";

export default interface PrinterRepository {
    getAll(): Promise<impresora[]>;
    getById(id: number): Promise<impresora | null>;
}