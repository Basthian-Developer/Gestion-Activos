import { useActivos } from "@/hooks/useActivos";
import { useEffect, useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, createColumnHelper, flexRender } from "@tanstack/react-table"
import DetalleComputador from "@/components/DetallesComputador";
import DetalleImpresora from "./DetallesImpresoras";
import DetallePeriferico from "./DetallesPerifericos";
import type Activo from "@/models/Activo";

type Estado = "Disponible" | "Asignado" | "En reparación" | "Baja";

export default function Inventario() {
    const { data, isLoading: loadingActivos, error: errorActivos, refetch, isFetching } = useActivos();
    const [busqueda, setBusqueda] = useState<string>("");
    const [estado, setEstado] = useState<Estado | "">("");
    const [tipo, setTipo] = useState<string>("");
    const [seleccionado, setSeleccionado] = useState<number | null>(null);

    const activos = useMemo(() => data ?? [], [data]);

    const tiposDisponibles = [...new Set(activos.map((c) => c.tipo))];
    const activosFiltrados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase();

        return activos.filter((activo) => {
            const coincideBusqueda =
                !busqueda ||
                `${activo.codigo} ${activo.marca} ${activo.modelo} ${activo.responsable}`
                    .toLowerCase()
                    .includes(textoBusqueda);

            const coincideEstado =
                !estado || activo.estado === estado;

            const coincideTipo =
                !tipo || activo.tipo === tipo;

            return coincideBusqueda && coincideEstado && coincideTipo;
        });
    }, [activos, busqueda, estado, tipo]);

    const limpiarFiltros = () => {
        setBusqueda("");
        setEstado("");
        setTipo("");
    };

    const activoSeleccionado = activos.find(
        (activo) => activo.id === seleccionado
    );

    const columnHelper = createColumnHelper<Activo>();

    const columns = [
        columnHelper.accessor("codigo", {
            header: "Código",
        }),

        columnHelper.display({
            id: "activo",
            header: "Activo",
            cell: ({ row }) => (
                <div>
                    <strong>
                        {row.original.marca} {row.original.modelo}
                    </strong>

                    <small className="block text-xs text-[#b2b7c8]">
                        {row.original.tipo} · {row.original.serial}
                    </small>
                </div>
            ),
        }),

        columnHelper.accessor("responsable", {
            header: "Responsable",
        }),

        columnHelper.accessor("ubicacion", {
            header: "Ubicación",
        }),

        columnHelper.accessor("estado", {
            header: "Estado",
        }),

        columnHelper.display({
            id: "acciones",
            header: "",
            cell: ({ row }) => (
                <button
                    type="button"
                    className="
                    bg-[#e35d62]
                    hover:bg-[#ff8b6a]
                    text-white
                    px-4 py-2
                    rounded-lg
                    transition-colors
                    duration-200
                "
                    onClick={() => setSeleccionado(row.original.id)}
                >
                    Ver detalle
                </button>
            ),
        }),
    ];

    const table = useReactTable({
        data: activosFiltrados,
        columns,

        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
        },

        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

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
                                            (
                                                table.getRowModel().rows.map((row) => (
                                                    <tr
                                                        key={row.id}
                                                        className="border-t border-[#303747] transition hover:bg-[#23202a] hover:brightness-110 hover:shadow-lg text-center"
                                                    >
                                                        {
                                                            row.getVisibleCells().map((cell) => (
                                                                <td
                                                                    key={cell.id}
                                                                    className="px-3 py-4"
                                                                >
                                                                    {flexRender(
                                                                        cell.column.columnDef.cell,
                                                                        cell.getContext()
                                                                    )}
                                                                </td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))
                                            )}
                        </tbody>
                    </table>
                    <div className="mt-4 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="rounded-lg border border-[#303747] px-4 py-2 text-sm text-[#f4f6ff] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Anterior
                        </button>

                        <span className="text-sm text-[#b2b7c8]">
                            Página {table.getState().pagination.pageIndex + 1} de{" "}
                            {table.getPageCount()}
                        </span>

                        <button
                            type="button"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="rounded-lg border border-[#303747] px-4 py-2 text-sm text-[#f4f6ff] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>

                {!loadingActivos && !errorActivos &&
                    (
                        <p className="mt-4 text-xs text-[#b2b7c8]">
                            Mostrando {table.getRowModel().rows.length} de{" "}
                            {activosFiltrados.length} activos
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

            {seleccionado != null &&
                (activoSeleccionado?.tipo !== "Notebook" &&
                    activoSeleccionado?.tipo !== "Desktop" &&
                    activoSeleccionado?.tipo !== "Impresora")
                && (
                    <DetallePeriferico
                        abierto={seleccionado !== null}
                        onCerrar={() => setSeleccionado(null)}
                        id={seleccionado}
                    />
                )}
        </section>
    )
}