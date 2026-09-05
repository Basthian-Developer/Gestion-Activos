import { useEffect, useMemo, useState } from "react";

type Estado = "Disponible" | "Asignado" | "En reparación" | "Baja";

type Vista =
    | "resumen"
    | "inventario"
    | "asignaciones"
    | "movimientos"
    | "alertas"
    | "indicadores"
    | "reparaciones"
    | "configuracion";

interface Activo {
    codigo: string;
    tipo: string;
    marca: string;
    modelo: string;
    usuario: string;
    ubicacion: string;
    estado: Estado;
    serie: string;
    observaciones: string;
}

interface Alerta {
    id: string;
    titulo: string;
    descripcion: string;
    prioridad: "alta" | "media" | "baja";
    resuelta: boolean;
}

const ACTIVOS: Activo[] = [
    {
        codigo: "TS-EQ-0142",
        tipo: "Notebook",
        marca: "Lenovo",
        modelo: "ThinkPad E14",
        usuario: "Camila Reyes",
        ubicacion: "Casa Matriz · Piso 3",
        estado: "Asignado",
        serie: "LNV-8841-CC",
        observaciones: "Batería con autonomía normal.",
    },
    {
        codigo: "TS-EQ-0143",
        tipo: "Notebook",
        marca: "HP",
        modelo: "ProBook 440",
        usuario: "Ignacio Torres",
        ubicacion: "Casa Matriz · Piso 4",
        estado: "Asignado",
        serie: "HP-2291-DA",
        observaciones: "Leve desgaste en esquina inferior.",
    },
    {
        codigo: "TS-EQ-0144",
        tipo: "Notebook",
        marca: "Dell",
        modelo: "Latitude 5430",
        usuario: "Sin asignar",
        ubicacion: "Servicio Técnico Externo",
        estado: "En reparación",
        serie: "DLL-7723-FZ",
        observaciones: "Falla de encendido intermitente.",
    },
    {
        codigo: "TS-EQ-0145",
        tipo: "Computador de escritorio",
        marca: "HP",
        modelo: "EliteDesk 800",
        usuario: "Sin asignar",
        ubicacion: "Bodega Central Concepción",
        estado: "Disponible",
        serie: "HP-9012-KT",
        observaciones: "Embalaje original conservado.",
    },
    {
        codigo: "TS-EQ-0147",
        tipo: "Teléfono móvil",
        marca: "Samsung",
        modelo: "Galaxy A54",
        usuario: "Matías Herrera",
        ubicacion: "Sucursal Talcahuano",
        estado: "Asignado",
        serie: "SM-5541-JN",
        observaciones: "Protector de pantalla con rayadura leve.",
    },
    {
        codigo: "TS-EQ-0153",
        tipo: "Periférico",
        marca: "HP",
        modelo: "Webcam 320",
        usuario: "Sin asignar",
        ubicacion: "Bodega Central Concepción",
        estado: "Baja",
        serie: "HP-6634-NP",
        observaciones: "Falla permanente de sensor.",
    },
];

const ALERTAS_INICIALES: Alerta[] = [
    {
        id: "al1",
        titulo: "3 activos con garantía vencida",
        descripcion: "TS-EQ-0146, TS-EQ-0153 y TS-EQ-0162 requieren revisión.",
        prioridad: "alta",
        resuelta: false,
    },
    {
        id: "al2",
        titulo: "Licencia Adobe Creative Cloud vencida",
        descripcion: "Pendiente de renovación hace más de 60 días.",
        prioridad: "alta",
        resuelta: false,
    },
    {
        id: "al3",
        titulo: "Equipo en reparación por más de 15 días",
        descripcion: "TS-EQ-0144 continúa en servicio técnico externo.",
        prioridad: "media",
        resuelta: false,
    },
    {
        id: "al4",
        titulo: "Activo con información incompleta",
        descripcion: "TS-EQ-0157 no tiene ubicación física registrada.",
        prioridad: "baja",
        resuelta: false,
    },
];

const MOVIMIENTOS = [
    [
        "Asignación confirmada",
        "TS-EQ-0142",
        "Camila Reyes",
        "Casa Matriz · Piso 3",
        "Hoy · 09:42",
    ],
    [
        "Envío a reparación",
        "TS-EQ-0144",
        "Pablo Sepúlveda",
        "Servicio Técnico Externo",
        "Ayer · 16:20",
    ],
    [
        "Traslado registrado",
        "TS-EQ-0147",
        "Matías Herrera",
        "Sucursal Talcahuano",
        "02 sep · 11:05",
    ],
    [
        "Devolución completada",
        "TS-EQ-0143",
        "Ignacio Torres",
        "Bodega Central Concepción",
        "01 sep · 15:12",
    ],
];

const MENU: {
    id: Vista;
    label: string;
    icon: string;
    grupo: string;
}[] = [
        {
            id: "resumen",
            label: "Resumen",
            icon: "fa-chart-pie",
            grupo: "Principal",
        },
        {
            id: "inventario",
            label: "Inventario",
            icon: "fa-boxes-stacked",
            grupo: "Activos",
        },
        {
            id: "asignaciones",
            label: "Asignaciones",
            icon: "fa-user-check",
            grupo: "Activos",
        },
        {
            id: "movimientos",
            label: "Movimientos",
            icon: "fa-arrow-right-arrow-left",
            grupo: "Activos",
        },
        {
            id: "reparaciones",
            label: "Reparaciones",
            icon: "fa-screwdriver-wrench",
            grupo: "Activos",
        },
        {
            id: "indicadores",
            label: "Indicadores",
            icon: "fa-chart-line",
            grupo: "Principal",
        },
        {
            id: "alertas",
            label: "Alertas",
            icon: "fa-triangle-exclamation",
            grupo: "Gestión",
        },
        {
            id: "configuracion",
            label: "Configuración",
            icon: "fa-sliders",
            grupo: "Gestión",
        },
    ];

export function Home() {
    const [vista, setVista] = useState<Vista>("resumen");

    const [sidebarAbierta, setSidebarAbierta] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(min-width: 1024px)").matches,
    );

    const [busqueda, setBusqueda] = useState("");
    const [estado, setEstado] = useState<Estado | "">("");
    const [tipo, setTipo] = useState("");
    const [seleccionado, setSeleccionado] = useState<Activo | null>(null);
    const [alertas, setAlertas] = useState<Alerta[]>(ALERTAS_INICIALES);
    const [toast, setToast] = useState("");

    const activosFiltrados = useMemo(() => {
        return ACTIVOS.filter((activo) => {
            const coincideBusqueda =
                !busqueda ||
                `${activo.codigo} ${activo.marca} ${activo.modelo} ${activo.usuario}`
                    .toLowerCase()
                    .includes(busqueda.toLowerCase());

            const coincideEstado = !estado || activo.estado === estado;
            const coincideTipo = !tipo || activo.tipo === tipo;

            return coincideBusqueda && coincideEstado && coincideTipo;
        });
    }, [busqueda, estado, tipo]);

    const totalActivos = ACTIVOS.length;

    const asignados = ACTIVOS.filter(
        (activo) => activo.estado === "Asignado",
    ).length;

    const disponibles = ACTIVOS.filter(
        (activo) => activo.estado === "Disponible",
    ).length;

    const enReparacion = ACTIVOS.filter(
        (activo) => activo.estado === "En reparación",
    ).length;

    const alertasPendientes = alertas.filter(
        (alerta) => !alerta.resuelta,
    ).length;

    const tiposDisponibles = [...new Set(ACTIVOS.map((activo) => activo.tipo))];

    const mostrarToast = (texto: string) => {
        setToast(texto);
    };

    const cambiarVista = (nuevaVista: Vista) => {
        setVista(nuevaVista);
        setSidebarAbierta(false);
    };

    const limpiarFiltros = () => {
        setBusqueda("");
        setEstado("");
        setTipo("");
    };

    const resolverAlerta = (id: string) => {
        setAlertas((actuales) =>
            actuales.map((alerta) =>
                alerta.id === id
                    ? {
                        ...alerta,
                        resuelta: true,
                    }
                    : alerta,
            ),
        );

        mostrarToast("Alerta marcada como resuelta.");
    };

    useEffect(() => {
        if (!toast) {
            return;
        }

        const id = window.setTimeout(() => {
            setToast("");
        }, 3200);

        return () => {
            window.clearTimeout(id);
        };
    }, [toast]);

    return (
        <div className="min-h-screen bg-[#10131b] text-[#f4f6ff] font-sans ambient-shell lg:flex">
            {sidebarAbierta && (
                <button
                    type="button"
                    className="fixed inset-0 z-30 bg-black/60 lg:hidden"
                    aria-label="Cerrar menú"
                    onClick={() => setSidebarAbierta(false)}
                />
            )}

            {/*======================================================================
                Menú lateral
            ======================================================================*/}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 shrink-0 flex-col border-r border-[#e35d6233] bg-gradient-to-b from-[#241517] via-[#35191f] to-[#572126] p-5 transition-transform duration-300 lg:sticky lg:top-0 ${sidebarAbierta
                    ? "translate-x-0"
                    : "-translate-x-full lg:-ml-72"
                    }`}
            >
                <div className="mb-8 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#ffb36b] to-[#e35d62] text-xl font-bold text-[#241517]">
                            T
                        </div>

                        <div>
                            <div className="font-serif text-xl">TecnoSur</div>
                            <div className="text-[10px] uppercase tracking-[.18em] text-[#ffb36bcc]">
                                Control de activos
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setSidebarAbierta(false)}
                        className="grid h-9 w-9 place-items-center rounded-lg text-lg text-[#ffb36b] transition hover:bg-white/10"
                        aria-label="Ocultar menú"
                        title="Ocultar menú"
                    >
                        <i
                            className="fa-solid fa-xmark"
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <nav className="space-y-6 overflow-y-auto">
                    {["Principal", "Activos", "Gestión"].map((grupo) => (
                        <div key={grupo}>
                            <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#ffb36b99]">
                                {grupo}
                            </div>

                            <div className="space-y-1">
                                {MENU.filter(
                                    (item) => item.grupo === grupo,
                                ).map((item) => (
                                    <button
                                        type="button"
                                        key={item.id}
                                        onClick={() =>
                                            cambiarVista(item.id)
                                        }
                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${vista === item.id
                                            ? "bg-gradient-to-r from-[#e35d62] to-[#a63f50] text-white shadow-lg shadow-[#e35d6233]"
                                            : "text-[#f4f6ffcc] hover:bg-[#e35d621f]"
                                            }`}
                                    >
                                        <i
                                            className={`fa-solid ${item.icon}`}
                                            aria-hidden="true"
                                        />

                                        <span>{item.label}</span>

                                        {item.id === "inventario" && (
                                            <span className="ml-auto rounded-full bg-white/10 px-2 text-xs">
                                                128
                                            </span>
                                        )}

                                        {item.id === "alertas" && (
                                            <span className="ml-auto rounded-full bg-[#ffb36b33] px-2 text-xs text-[#ffb36b]">
                                                {alertasPendientes}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="mt-auto border-t border-white/10 pt-4 text-xs text-[#ffb36bcc]">
                    <i className="fa-solid fa-circle text-[7px] text-[#a8d36b]" />{" "}
                    Sistema operativo
                    <br />
                    <span className="opacity-60">
                        Datos de demostración · v0.8
                    </span>
                </div>
            </aside>

            {/*======================================================================
                Contenido principal
            ======================================================================*/}

            <main className="min-w-0 flex-1 lg:min-h-screen">
                <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#303747] bg-[#10131bdd] px-5 py-3 backdrop-blur-xl lg:px-10">
                    <div className="flex items-center gap-4">
                        {!sidebarAbierta && (
                            <button
                                type="button"
                                className="text-xl text-[#ff8b6a]"
                                onClick={() =>
                                    setSidebarAbierta((actual) => !actual)
                                }
                                aria-label={
                                    sidebarAbierta
                                        ? "Cerrar menú"
                                        : "Abrir menú"
                                }
                            >
                                <i
                                    className={`fa-solid ${sidebarAbierta
                                        ? "fa-xmark"
                                        : "fa-bars"
                                        }`}
                                    aria-hidden="true"
                                />
                            </button>
                        )}

                        <div className="hidden text-xs text-[#b2b7c8] sm:block">
                            TecnoSur /{" "}
                            <span className="text-[#ff8b6a]">
                                {vista}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="hidden items-center gap-2 rounded-lg border border-[#303747] bg-[#191e29] px-3 py-2 text-sm text-[#b2b7c8] md:flex">
                            <i
                                className="fa-solid fa-magnifying-glass"
                                aria-hidden="true"
                            />

                            <input
                                value={busqueda}
                                onChange={(event) =>
                                    setBusqueda(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        cambiarVista("inventario");
                                    }
                                }}
                                className="w-52 bg-transparent outline-none placeholder:text-[#b2b7c8]"
                                placeholder="Buscar activo…"
                            />
                        </label>

                        <button
                            type="button"
                            className="relative text-lg text-[#ff8b6a]"
                            onClick={() => {
                                cambiarVista("alertas");
                                mostrarToast(
                                    "Tienes alertas pendientes de revisión.",
                                );
                            }}
                            aria-label="Notificaciones"
                        >
                            <i
                                className="fa-solid fa-bell"
                                aria-hidden="true"
                            />
                            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#e35d62]" />
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ff8b6a] to-[#a63f50] text-xs font-bold">
                                CR
                            </div>

                            <div className="hidden sm:block">
                                <div className="text-xs font-semibold">
                                    Camila Reyes
                                </div>
                                <div className="text-[10px] text-[#b2b7c8]">
                                    Coordinadora TI
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="px-5 py-5 lg:px-10 lg:py-7">
                    {vista === "resumen" && (
                        <section>
                            <div className="mb-7">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ff8b6a]">
                                    Miércoles, 04 de septiembre de 2026
                                </p>

                                <h1 className="font-serif text-3xl tracking-tight text-[#f4f6ff] lg:text-5xl">
                                    Un panorama claro para avanzar.
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b2b7c8]">
                                    El pulso de tus activos tecnológicos:
                                    lo que está en orden, lo que se mueve y
                                    aquello que merece una mirada.
                                </p>
                            </div>

                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="font-serif text-xl">
                                    Estado de la operación
                                </h2>

                                <button
                                    type="button"
                                    className="action-button"
                                    onClick={() =>
                                        mostrarToast(
                                            "Registrar activo estará disponible con el backend.",
                                        )
                                    }
                                >
                                    <i
                                        className="fa-solid fa-plus"
                                        aria-hidden="true"
                                    />{" "}
                                    Registrar activo
                                </button>
                            </div>

                            {/*======================================================================
                                Contadores
                            ======================================================================*/}
                            <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {[
                                    [
                                        "Activos registrados",
                                        totalActivos,
                                        "fa-boxes-stacked",
                                    ],
                                    [
                                        "Asignados",
                                        asignados,
                                        "fa-user-check",
                                    ],
                                    [
                                        "Disponibles",
                                        disponibles,
                                        "fa-circle-check",
                                    ],
                                    [
                                        "Requieren atención",
                                        enReparacion + 4,
                                        "fa-triangle-exclamation",
                                    ],
                                ].map(([label, value, icon], index) => (
                                    <article
                                        key={String(label)}
                                        className={`rounded-2xl border p-5 shadow-xl transition-transform duration-300 hover:scale-105 ${index === 0
                                            ? "border-[#e35d6266] bg-gradient-to-br from-[#a63f50] to-[#241517]"
                                            : "border-[#303747] bg-[#191e29]"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between text-sm text-[#b2b7c8]">
                                            <span>{label}</span>
                                            <span className="text-[#ff8b6a]">
                                                <i
                                                    className={`fa-solid ${String(
                                                        icon,
                                                    )}`}
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </div>

                                        <div className="mt-7 font-serif text-4xl">
                                            {value}
                                        </div>

                                        <div className="mt-2 text-xs text-[#ffb36b]">
                                            {index === 3
                                                ? "6 alertas pendientes"
                                                : "Datos demostrativos"}
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/*=========================================================
                                Actividad reciente
                            ============================================================*/}
                            <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
                                <article className="rounded-2xl border border-[#303747] bg-[#191e29] p-5 shadow-xl">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <h2 className="font-serif text-xl">
                                                Actividad reciente
                                            </h2>
                                            <p className="text-xs text-[#b2b7c8]">
                                                Movimientos importantes del
                                                equipo
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="text-xs font-bold text-[#ff8b6a]"
                                            onClick={() =>
                                                cambiarVista(
                                                    "movimientos",
                                                )
                                            }
                                        >
                                            Ver todo →
                                        </button>
                                    </div>

                                    {MOVIMIENTOS.slice(0, 3).map(
                                        (movimiento) => (
                                            <div
                                                className="flex gap-3 border-t border-[#303747] py-4 transition-transform duration-300 hover:scale-105"
                                                key={movimiento[1]}
                                            >
                                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#43252c] text-[#ff8b6a]">
                                                    <i
                                                        className="fa-solid fa-arrow-right"
                                                        aria-hidden="true"
                                                    />
                                                </span>

                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold">
                                                        {movimiento[0]} ·{" "}
                                                        {movimiento[1]}
                                                    </p>
                                                    <p className="text-xs text-[#b2b7c8]">
                                                        {movimiento[2]} ·{" "}
                                                        {movimiento[3]}
                                                    </p>
                                                </div>

                                                <time className="ml-auto whitespace-nowrap text-[10px] text-[#b2b7c8]">
                                                    {movimiento[4]}
                                                </time>
                                            </div>
                                        ),
                                    )}
                                </article>

                                <article className="rounded-2xl border border-[#303747] bg-[#191e29] p-5 shadow-xl">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <h2 className="font-serif text-xl">
                                                Alertas operativas
                                            </h2>
                                            <p className="text-xs text-[#b2b7c8]">
                                                Situaciones que merecen
                                                atención
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="text-xs font-bold text-[#ff8b6a]"
                                            onClick={() =>
                                                cambiarVista("alertas")
                                            }
                                        >
                                            Ver todas
                                        </button>
                                    </div>

                                    {[
                                        "Garantías vencidas",
                                        "Licencia pendiente",
                                        "Reparación extendida",
                                    ].map((texto) => (
                                        <div
                                            key={texto}
                                            className="mb-3 flex gap-3 rounded-xl bg-[#2a2024] p-3 text-sm transition-transform duration-300 hover:scale-105"
                                        >
                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#e35d62] shadow-[0_0_12px_#e35d62]" />
                                            <span>{texto}</span>
                                        </div>
                                    ))}
                                </article>
                            </div>
                        </section>
                    )}

                    {vista === "inventario" && (
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
                                            {activosFiltrados.map(
                                                (activo) => (
                                                    <tr
                                                        key={activo.codigo}
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
                                                                    activo.serie
                                                                }
                                                            </small>
                                                        </td>

                                                        <td className="px-3 py-4">
                                                            {
                                                                activo.usuario
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
                                                                        activo,
                                                                    )
                                                                }
                                                            >
                                                                Ver detalle
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>

                                    {!activosFiltrados.length && (
                                        <p className="py-10 text-center text-sm text-[#b2b7c8]">
                                            No se encontraron activos.
                                        </p>
                                    )}
                                </div>

                                <p className="mt-4 text-xs text-[#b2b7c8]">
                                    Mostrando {activosFiltrados.length} de{" "}
                                    {ACTIVOS.length} activos · Datos de
                                    demostración
                                </p>
                            </div>
                        </section>
                    )}

                    {vista === "asignaciones" && (
                        <section>
                            <div className="mb-7">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ff8b6a]">
                                    Activos / Personas
                                </p>

                                <h1 className="font-serif text-3xl tracking-tight text-[#f4f6ff] lg:text-5xl">
                                    Historial de asignaciones
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b2b7c8]">
                                    Una línea de tiempo clara para entender
                                    quién recibió cada activo y cuándo.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#303747] bg-[#191e29] p-5 shadow-xl">
                                <div className="mb-6 flex items-center justify-between border-b border-[#303747] pb-4 text-xs uppercase tracking-wider text-[#b2b7c8]">
                                    <span className="text-[#ff8b6a]">
                                        <i
                                            className="fa-solid fa-clock-rotate-left"
                                            aria-hidden="true"
                                        />{" "}
                                        Registro de actividad
                                    </span>

                                    <span>Últimos movimientos</span>
                                </div>

                                <div className="assignment-log">
                                    {ACTIVOS.filter(
                                        (activo) =>
                                            activo.estado !== "Baja",
                                    ).map((activo, index) => (
                                        <article
                                            className="assignment-event"
                                            key={activo.codigo}
                                        >
                                            <div className="assignment-rail">
                                                <span
                                                    className={`assignment-node ${index === 0
                                                        ? "current"
                                                        : ""
                                                        }`}
                                                >
                                                    <i
                                                        className={`fa-solid ${activo.tipo ===
                                                            "Teléfono móvil"
                                                            ? "fa-mobile-screen-button"
                                                            : "fa-laptop"
                                                            }`}
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </div>

                                            <div className="pb-7">
                                                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${index === 2
                                                            ? "bg-[#493423] text-[#ffb36b]"
                                                            : "bg-[#43252c] text-[#ff8b6a]"
                                                            }`}
                                                    >
                                                        {index === 2
                                                            ? "Traslado pendiente"
                                                            : "Asignación confirmada"}
                                                    </span>

                                                    <time className="text-xs text-[#b2b7c8]">
                                                        {index === 0
                                                            ? "Hoy · 09:42"
                                                            : `${index + 1} sep · 11:05`}
                                                    </time>
                                                </div>

                                                <h3 className="font-serif text-xl">
                                                    {activo.marca}{" "}
                                                    {activo.modelo}
                                                    <span className="ml-2 font-sans text-xs text-[#b2b7c8]">
                                                        {activo.codigo}
                                                    </span>
                                                </h3>

                                                <p className="mt-1 text-xs text-[#b2b7c8]">
                                                    <i
                                                        className="fa-solid fa-user"
                                                        aria-hidden="true"
                                                    />{" "}
                                                    {activo.usuario}
                                                </p>

                                                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#b2b7c8]">
                                                    <span>
                                                        <i
                                                            className="fa-solid fa-box"
                                                            aria-hidden="true"
                                                        />{" "}
                                                        Bodega Central
                                                    </span>

                                                    <i
                                                        className="fa-solid fa-arrow-right"
                                                        aria-hidden="true"
                                                    />

                                                    <span>
                                                        <i
                                                            className="fa-solid fa-location-dot"
                                                            aria-hidden="true"
                                                        />{" "}
                                                        {
                                                            activo.ubicacion
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    className="action-button mt-2"
                                    onClick={() =>
                                        mostrarToast(
                                            "La nueva asignación se habilitará al conectar el backend.",
                                        )
                                    }
                                >
                                    <i
                                        className="fa-solid fa-user-plus"
                                        aria-hidden="true"
                                    />{" "}
                                    Nueva asignación
                                </button>
                            </div>
                        </section>
                    )}

                    {vista === "movimientos" && (
                        <section>
                            <div className="mb-7">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ff8b6a]">
                                    Trazabilidad / Registro histórico
                                </p>

                                <h1 className="font-serif text-3xl tracking-tight text-[#f4f6ff] lg:text-5xl">
                                    Movimientos recientes
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b2b7c8]">
                                    Cada cambio importante deja una huella
                                    clara y consultable.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#303747] bg-[#191e29] p-5 shadow-xl">
                                <div className="space-y-1">
                                    {MOVIMIENTOS.map(
                                        (movimiento, index) => (
                                            <div
                                                className="assignment-event"
                                                key={movimiento[1]}
                                            >
                                                <div className="assignment-rail">
                                                    <span
                                                        className={`assignment-node ${index % 2
                                                            ? "warning"
                                                            : "current"
                                                            }`}
                                                    >
                                                        <i
                                                            className="fa-solid fa-arrow-right-arrow-left"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                </div>

                                                <div className="border-b border-[#303747] pb-6">
                                                    <div className="flex flex-wrap justify-between gap-2">
                                                        <h3 className="font-serif text-lg">
                                                            {
                                                                movimiento[0]
                                                            }{" "}
                                                            ·{" "}
                                                            {
                                                                movimiento[1]
                                                            }
                                                        </h3>

                                                        <time className="text-xs text-[#b2b7c8]">
                                                            {
                                                                movimiento[4]
                                                            }
                                                        </time>
                                                    </div>

                                                    <p className="mt-2 text-sm text-[#b2b7c8]">
                                                        Responsable:{" "}
                                                        {movimiento[2]} ·
                                                        Destino:{" "}
                                                        {movimiento[3]}
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </section>
                    )}

                    {vista === "alertas" && (
                        <section>
                            <div className="mb-7">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ff8b6a]">
                                    Gestión / Atención operativa
                                </p>

                                <h1 className="font-serif text-3xl tracking-tight text-[#f4f6ff] lg:text-5xl">
                                    Alertas que requieren mirada
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b2b7c8]">
                                    Prioriza lo que puede afectar la
                                    continuidad del equipo.
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {alertas.map((alerta) => (
                                    <article
                                        key={alerta.id}
                                        className={`rounded-2xl border border-[#303747] bg-[#191e29] p-5 shadow-xl transition-transform duration-400 hover:scale-103 ${alerta.resuelta
                                            ? "opacity-50"
                                            : ""
                                            }`}
                                    >
                                        <div className="mb-5 flex justify-between">
                                            <span
                                                className={`h-2 w-2 rounded-full ${alerta.prioridad === "alta"
                                                    ? "bg-[#e35d62] shadow-[0_0_12px_#e35d62]"
                                                    : "bg-[#ffb36b]"
                                                    }`}
                                            />

                                            <span className="rounded-full bg-[#43252c] px-2 py-1 text-[10px] font-bold uppercase text-[#ff8b6a]">
                                                {alerta.prioridad}
                                            </span>
                                        </div>

                                        <h3 className="font-serif text-xl">
                                            {alerta.titulo}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-[#b2b7c8]">
                                            {alerta.descripcion}
                                        </p>

                                        {!alerta.resuelta && (
                                            <button
                                                type="button"
                                                className="mt-5 text-xs font-bold text-[#ff8b6a]"
                                                onClick={() =>
                                                    resolverAlerta(
                                                        alerta.id,
                                                    )
                                                }
                                            >
                                                Marcar resuelta →
                                            </button>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {vista === "indicadores" && (
                        <section>
                            <div className="mb-7">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ff8b6a]">
                                    Principal / Lectura ejecutiva
                                </p>

                                <h1 className="font-serif text-3xl tracking-tight text-[#f4f6ff] lg:text-5xl">
                                    Indicadores operativos
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b2b7c8]">
                                    Una lectura compacta para tomar
                                    decisiones de inventario.
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <article className="rounded-2xl border border-[#303747] bg-[#191e29] p-5 shadow-xl">
                                    <h2 className="font-serif text-xl">
                                        Activos por estado
                                    </h2>

                                    <div className="mt-6 space-y-5">
                                        {(
                                            [
                                                "Asignado",
                                                "Disponible",
                                                "En reparación",
                                                "Baja",
                                            ] as Estado[]
                                        ).map((estadoActual) => {
                                            const cantidad = ACTIVOS.filter(
                                                (activo) =>
                                                    activo.estado ===
                                                    estadoActual,
                                            ).length;

                                            return (
                                                <div key={estadoActual}>
                                                    <div className="mb-2 flex justify-between text-sm">
                                                        <span>
                                                            {
                                                                estadoActual
                                                            }
                                                        </span>
                                                        <span className="text-[#b2b7c8]">
                                                            {cantidad}
                                                        </span>
                                                    </div>

                                                    <div className="h-2 rounded-full bg-[#303747]">
                                                        <div
                                                            className="h-full rounded-full bg-gradient-to-r from-[#e35d62] to-[#ffb36b]"
                                                            style={{
                                                                width: `${Math.max(
                                                                    (cantidad /
                                                                        ACTIVOS.length) *
                                                                    100,
                                                                    6,
                                                                )}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </article>

                                <article className="rounded-2xl border border-[#303747] bg-[#191e29] p-5 shadow-xl">
                                    <h2 className="font-serif text-xl">
                                        Calidad del inventario
                                    </h2>

                                    <div className="mt-8 font-serif text-6xl">
                                        95
                                        <span className="text-3xl">%</span>
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-[#b2b7c8]">
                                        122 de 128 activos cuentan con
                                        información mínima validada.
                                    </p>

                                    <div className="mt-6 h-2 rounded-full bg-[#303747]">
                                        <div className="h-full w-[95%] rounded-full bg-[#e35d62]" />
                                    </div>
                                </article>
                            </div>
                        </section>
                    )}

                    {vista === "reparaciones" && (
                        <section>
                            <div className="mb-7">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ff8b6a]">
                                    Gestión / Reparaciones
                                </p>

                                <h1 className="font-serif text-3xl tracking-tight text-[#f4f6ff] lg:text-5xl">
                                    Reparaciones
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b2b7c8]">
                                    Equipos fuera de operación y próximos
                                    pasos.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#303747] bg-[#191e29] p-10 text-center text-4xl text-[#ff8b6a] shadow-xl">
                                <i
                                    className="fa-solid fa-screwdriver-wrench"
                                    aria-hidden="true"
                                />

                                <p className="mt-4 text-sm text-[#b2b7c8]">
                                    Módulo preparado para futura
                                    integración.
                                </p>
                            </div>
                        </section>
                    )}

                    {vista === "configuracion" && (
                        <section>
                            <div className="mb-7">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#ff8b6a]">
                                    Gestión / Configuración
                                </p>

                                <h1 className="font-serif text-3xl tracking-tight text-[#f4f6ff] lg:text-5xl">
                                    Configuración
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b2b7c8]">
                                    Preferencias demostrativas del espacio
                                    TecnoSur.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#303747] bg-[#191e29] p-10 text-center text-4xl text-[#ff8b6a] shadow-xl">
                                <i
                                    className="fa-solid fa-sliders"
                                    aria-hidden="true"
                                />

                                <p className="mt-4 text-sm text-[#b2b7c8]">
                                    Módulo preparado para futura
                                    integración.
                                </p>
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* Detalle del activo seleccionado */}
            {seleccionado && (
                <>
                    <button
                        type="button"
                        className="fixed inset-0 z-40 bg-black/60"
                        onClick={() => setSeleccionado(null)}
                        aria-label="Cerrar detalle"
                    />

                    <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-[#303747] bg-[#151a24] p-6 shadow-2xl entrada-lateral">
                        <div className="mb-7 flex items-start justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff8b6a]">
                                    Ficha de activo
                                </p>

                                <h2 className="mt-2 font-serif text-3xl">
                                    {seleccionado.marca}{" "}
                                    {seleccionado.modelo}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSeleccionado(null)
                                }
                                className="text-2xl text-[#b2b7c8]"
                                aria-label="Cerrar"
                            >
                                ×
                            </button>
                        </div>

                        <div className="rounded-xl bg-[#43252c] p-4">
                            <div className="flex justify-between text-sm font-bold">
                                <span>{seleccionado.codigo}</span>
                                <span className="text-[#ffb36b]">
                                    {seleccionado.estado}
                                </span>
                            </div>
                        </div>

                        <dl className="mt-6 grid grid-cols-2 gap-4">
                            {[
                                ["Tipo", seleccionado.tipo],
                                ["Serie", seleccionado.serie],
                                [
                                    "Responsable",
                                    seleccionado.usuario,
                                ],
                                [
                                    "Ubicación",
                                    seleccionado.ubicacion,
                                ],
                                [
                                    "Condición",
                                    seleccionado.estado === "Baja"
                                        ? "Dañado"
                                        : "Buena",
                                ],
                                ["Garantía", "14 marzo 2027"],
                            ].map(([label, value]) => (
                                <div
                                    className="border-b border-[#303747] pb-3"
                                    key={label}
                                >
                                    <dt className="text-[10px] uppercase text-[#b2b7c8]">
                                        {label}
                                    </dt>
                                    <dd className="mt-1 text-sm font-semibold">
                                        {value}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <h3 className="mt-8 font-serif text-xl">
                            Historial
                        </h3>

                        <div className="mt-4 space-y-4 border-l border-[#e35d62] pl-4">
                            <div>
                                <p className="text-sm font-bold">
                                    Asignación registrada
                                </p>
                                <p className="text-xs text-[#b2b7c8]">
                                    {seleccionado.usuario} ·{" "}
                                    {seleccionado.ubicacion}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-bold">
                                    Alta de activo
                                </p>
                                <p className="text-xs text-[#b2b7c8]">
                                    Ingreso desde proveedor
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="action-button mt-8 w-full justify-center"
                            onClick={() =>
                                mostrarToast(
                                    "La acción se registrará al conectar el backend.",
                                )
                            }
                        >
                            <i
                                className="fa-solid fa-arrow-right-arrow-left"
                                aria-hidden="true"
                            />{" "}
                            Registrar movimiento
                        </button>
                    </aside>
                </>
            )}

            {toast && (
                <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-[#ffb36b66] bg-[#35191f] px-4 py-3 text-sm text-[#fff0e8] shadow-2xl">
                    <i
                        className="fa-solid fa-circle-check"
                        aria-hidden="true"
                    />
                    <span className="ml-2">{toast}</span>
                </div>
            )}
        </div>
    );
}