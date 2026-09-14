import { activoRepository } from "@/config/dependencias";

export async function getAll(){
    return activoRepository.getAll();
}

export async function getById(id: number){
    return await activoRepository.getById(id);
}