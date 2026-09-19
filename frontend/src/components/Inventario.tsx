import { useActivos } from "@/hooks/useActivos";
import { useEffect, useState } from "react";
import DetalleComputador from "@/components/DetallesComputador";
import DetalleImpresora from "./DetallesImpresoras";

type Estado = "Disponible" | "Asignado" | "En reparación" | "Baja";

export default function Inventario() {
    const { data, isLoading: loadingActivos, error: errorActivos, refetch, isFetching } = useActivos();
    const [busqueda, setBusqueda] = useState<string>("");
    const [estado, setEstado] = useState<Estado | "">("");
    const [tipo, setTipo] = useState<string>("");
    const [seleccionado, setSeleccionado] = useState<number | null>(null);

    const activos = data ?? [];

    const tiposDisponibles = [...new Set(activos.map((c) => c.tipo))];
    const textoBusqueda = busqueda.trim().toLowerCase();
    const activosFiltrados = activos.filter((c) => {
        const coincideBusqueda =
            !busqueda ||
            `${c.codigo} ${c.marca} ${c.modelo} ${c.responsable}`
                .toLowerCase()
                .includes(textoBusqueda);

        const coincideEstado = !estado || c.estado === estado;
        const coincideTipo = !tipo || c.tipo === tipo;

        return coincideBusqueda && coincideEstado && coincideTipo
    });

    const limpiarFiltros = () => {
        setBusqueda("");
        setEstado("");
        setTipo("");
    };

    const activoSeleccionado = activos.find(
        (activo) => activo.id === seleccionado
    );

    useEffect(() => {
        if (errorActivos) {
            console.error(errorActivos);
        }
    }, [errorActivos]);

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
                            aria-label="Buscar activos"
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
                        aria-label="Filtrar por estado"
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
                        aria-label="Filtrar por tipo"
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
                            {loadingActivos ? (
                                <tr>
                                    <td colSpan={6} className="px-3 py-10 text-center text-[#b2b7c8]">
                                        Cargando inventario...
                                    </td>
                                </tr>
                            ) :
                                errorActivos ? (
                                    <tr>
                                        <td colSpan={6} className="px-3 py-10 text-center">
                                            <p role="alert">No se pudo cargar el inventario.</p>

                                            <button
                                                type="button"
                                                onClick={() => void refetch()}
                                                disabled={isFetching}
                                                className="mt-3 rounded-lg border px-3 py-2 disabled:opacity-50"
                                            >
                                                {isFetching ? "Reintentando…" : "Reintentar"}
                                            </button>
                                        </td>
                                    </tr>
                                ) :

                                    activos.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-3 py-10 text-center">
                                                No hay activos registrados.
                                            </td>
                                        </tr>
                                    ) :

                                        activosFiltrados.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-3 py-10 text-center">
                                                    No hay activos que coincidan con los filtros.
                                                </td>
                                            </tr>
                                        ) :
                                            (activosFiltrados.map(
                                                (activo) => (
                                                    <tr
                                                        key={activo.id}
                                                        className="border-t border-[#303747] transition hover:bg-[#23202a] hover:brightness-110 hover:shadow-lg text-center"
                                                    >
                                                        <td className="px-3 py-4 font-bold text-[#ff8b6a]">
                                                            {
                                                                activo.codigo
                                                            }
                                                        </td>

                                                        <td className="px-3 py-4">
                                                            <strong>
                                                                {
                                                                    activo.marca
                                                                }{" "}
                                                                {
                                                                    activo.modelo
                                                                }
                                                            </strong>

                                                            <small className="block text-xs text-[#b2b7c8]">
                                                                {
                                                                    activo.tipo
                                                                }{" "}
                                                                ·{" "}
                                                                {
                                                                    activo.serial
                                                                }
                                                            </small>
                                                        </td>

                                                        <td className="px-3 py-4">
                                                            {
                                                                activo.responsable
                                                            }
                                                        </td>

                                                        <td className="px-3 py-4 text-[#b2b7c8]">
                                                            {
                                                                activo.ubicacion
                                                            }
                                                        </td>

                                                        <td className="px-3 py-4">
                                                            <span
                                                                className={`rounded-full px-2 py-1 text-[10px] font-bold ${activo.estado ===
                                                                    "Asignado"
                                                                    ? "bg-[#493423] text-[#ffb36b]"
                                                                    : activo.estado ===
                                                                        "En reparación"
                                                                        ? "bg-[#43252c] text-[#ff8b6a]"
                                                                        : activo.estado ===
                                                                            "Disponible"
                                                                            ? "bg-[#263b36] text-[#a8d36b]"
                                                                            : "bg-[#303747] text-[#b2b7c8]"
                                                                    }`}
                                                            >
                                                                {
                                                                    activo.estado
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
                                                                        activo.id,
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

                {!loadingActivos && !errorActivos &&
                    (
                        <p className="mt-4 text-xs text-[#b2b7c8]">
                            Mostrando {activosFiltrados.length} de{" "}
                            {activos.length} activos
                        </p>
                    )}
            </div>
            {seleccionado != null &&
                (activoSeleccionado?.tipo === "Notebook" || 
                activoSeleccionado?.tipo === "Desktop")
                && (
                    <DetalleComputador
                        abierto={seleccionado !== null}
                        onCerrar={() => setSeleccionado(null)}
                        id={seleccionado}
                    />
                )}

            {seleccionado != null &&
                (activoSeleccionado?.tipo === "Impresora")
                && (
                    <DetalleImpresora
                        onCerrar={() => setSeleccionado(null)}
                        id={seleccionado}
                    />
                )}
        </section>
    )
}