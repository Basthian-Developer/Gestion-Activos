import { useComputadores } from "@/hooks/useComputers"
import { useEffect, useState } from "react";

type Estado = "Disponible" | "Asignado" | "En reparación" | "Baja";

export default function Inventario() {
    const { data: computers, isLoading: loadingComputers, isError: errorComputers } = useComputadores();
    const [busqueda, setBusqueda] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");
    const [_seleccionado, setSeleccionado] = useState<number | null>(null);

    const tiposDisponibles = [...new Set(computers?.map((c) => c.tipo))];

    const compFiltrados = computers?.filter((c) => {
        const coincideBusqueda =
            !busqueda ||
            `${c.codigo} ${c.marca} ${c.modelo} ${c.responsable}`
                .toLowerCase()
                .includes(busqueda.toLowerCase());

        const coincideEstado = !estado || c.estado === estado;
        const coincideTipo = !tipo || c.tipo === tipo;

        return coincideBusqueda && coincideEstado && coincideTipo
    });

    const limpiarFiltros = () => {
        setBusqueda("");
        setEstado("");
        setTipo("");
    };

    useEffect(() => {
        if (errorComputers) {
            console.error(errorComputers);
        }
    }, [errorComputers])

    return (
        <section>
            <div className="mb-7">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ff8b6a]">
                    Activos / Inventario
                </p>

                <h1 className="font-serif text-3xl tracking-tight text-[#f4f6ff] lg:text-5xl">
                    Inventario tecnológico
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b2b7c8]">
                    Consulta, filtra y abre el detalle de cada
                    activo.
                </p>
            </div>

            <div className="rounded-2xl border border-[#303747] bg-[#191e29] p-5 shadow-xl">
                <div className="mb-5 flex flex-wrap gap-3">
                    <div className="flex min-w-60 flex-1 items-center gap-2 rounded-lg border border-[#303747] bg-[#10131b] px-3 text-[#b2b7c8]">
                        <i
                            className="fa-solid fa-magnifying-glass"
                            aria-hidden="true"
                        />

                        <input
                            value={busqueda}
                            onChange={(event) =>
                                setBusqueda(
                                    event.target.value,
                                )
                            }
                            className="w-full bg-transparent py-2 text-sm text-[#f4f6ff] outline-none"
                            placeholder="Buscar por código, marca o modelo…"
                        />
                    </div>

                    <select
                        value={estado}
                        onChange={(event) =>
                            setEstado(
                                event.target.value as
                                | Estado
                                | "",
                            )
                        }
                        className="rounded-lg border border-[#303747] bg-[#10131b] px-3 text-sm text-[#f4f6ff]"
                    >
                        <option value="">
                            Todos los estados
                        </option>

                        {[
                            "Disponible",
                            "Asignado",
                            "En reparación",
                            "Baja",
                        ].map((valor) => (
                            <option
                                key={valor}
                                value={valor}
                            >
                                {valor}
                            </option>
                        ))}
                    </select>

                    <select
                        value={tipo}
                        onChange={(event) =>
                            setTipo(event.target.value)
                        }
                        className="rounded-lg border border-[#303747] bg-[#10131b] px-3 text-sm text-[#f4f6ff]"
                    >
                        <option value="">
                            Todos los tipos
                        </option>

                        {tiposDisponibles.map((valor) => (
                            <option
                                key={valor}
                                value={valor}
                            >
                                {valor}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        className="rounded-lg border border-[#303747] px-3 text-xs text-[#ff8b6a]"
                        onClick={limpiarFiltros}
                    >
                        Limpiar filtros
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="text-[10px] uppercase tracking-wider text-[#b2b7c8] text-center">
                            <tr>
                                {[
                                    "Código",
                                    "Activo",
                                    "Responsable",
                                    "Ubicación",
                                    "Estado",
                                    "",
                                ].map((encabezado) => (
                                    <th
                                        key={encabezado}
                                        className="px-3 py-3"
                                    >
                                        {encabezado}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {loadingComputers ? (
                                <tr>
                                    <td colSpan={6} className="px-3 py-10 text-center text-[#b2b7c8]">
                                        Cargando inventario...
                                    </td>
                                </tr>
                            ) :
                                (compFiltrados?.map(
                                    (computador) => (
                                        <tr
                                            key={computador.codigo}
                                            className="border-t border-[#303747] transition hover:bg-[#23202a] hover:brightness-110 hover:shadow-lg text-center"
                                        >
                                            <td className="px-3 py-4 font-bold text-[#ff8b6a]">
                                                {
                                                    computador.codigo
                                                }
                                            </td>

                                            <td className="px-3 py-4">
                                                <strong>
                                                    {
                                                        computador.marca
                                                    }{" "}
                                                    {
                                                        computador.modelo
                                                    }
                                                </strong>

                                                <small className="block text-xs text-[#b2b7c8]">
                                                    {
                                                        computador.tipo
                                                    }{" "}
                                                    ·{" "}
                                                    {
                                                        computador.serial
                                                    }
                                                </small>
                                            </td>

                                            <td className="px-3 py-4">
                                                {
                                                    computador.responsable
                                                }
                                            </td>

                                            <td className="px-3 py-4 text-[#b2b7c8]">
                                                {
                                                    computador.ubicacion
                                                }
                                            </td>

                                            <td className="px-3 py-4">
                                                <span
                                                    className={`rounded-full px-2 py-1 text-[10px] font-bold ${computador.estado ===
                                                        "Asignado"
                                                        ? "bg-[#493423] text-[#ffb36b]"
                                                        : computador.estado ===
                                                            "En reparación"
                                                            ? "bg-[#43252c] text-[#ff8b6a]"
                                                            : computador.estado ===
                                                                "Disponible"
                                                                ? "bg-[#263b36] text-[#a8d36b]"
                                                                : "bg-[#303747] text-[#b2b7c8]"
                                                        }`}
                                                >
                                                    {
                                                        computador.estado
                                                    }
                                                </span>
                                            </td>

                                            <td className="px-3 py-4">
                                                <button
                                                    type="button"
                                                    className="bg-[#e35d62]
                                                                hover:bg-[#ff8b6a]
                                                                text-white
                                                                px-4 py-2
                                                                rounded-lg
                                                                transition-colors
                                                                duration-200"
                                                    onClick={() =>
                                                        setSeleccionado(
                                                            computador.id,
                                                        )
                                                    }
                                                >
                                                    Ver detalle
                                                </button>
                                            </td>
                                        </tr>
                                    ),
                                ))}
                        </tbody>
                    </table>
                </div>

                <p className="mt-4 text-xs text-[#b2b7c8]">
                    Mostrando {compFiltrados?.length} de{" "}
                    {computers?.length} activos · Datos de
                    demostración
                </p>
            </div>
        </section>
    )
}