import JsonComputerRepository from "@/repositories/json/JsonComputerRepository";
import JsonActivoRepository from "@/repositories/json/JsonActivoRepository";

const modo = import.meta.env.VITE_BUILD_MODE;

export const computerRepository =
    modo === "demo" ?
        new JsonComputerRepository() :
        new JsonComputerRepository()

export const activoRepository =
    modo === "demo" ?
        new JsonActivoRepository() :
        new JsonActivoRepository()
