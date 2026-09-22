import { usePerifericos } from "@/hooks/usePerifericos";
import { useEffect } from "react";

interface DetallePerifericoProps {
    abierto: boolean;
    onCerrar: () => void;
    id: number;
}

export default function DetallePeriferico({
    abierto,
    onCerrar,
    id
}: DetallePerifericoProps) {
    const { data, isLoading, error } = usePerifericos();

    const perifericos = data ?? [];

    const periferico = perifericos.find(
        (computador) => computador.activo_id === id
    ) ?? null;


    useEffect(() => {
        if (error) {
            console.error(error);
        }
    }, [error]);

    if (!abierto) return null;

    return (
        <>
            {/* Fondo */}
            <button
                type="button"
                className="fixed inset-0 z-40 bg-black/60"
                onClick={onCerrar}
                aria-label="Cerrar detalle"
            />

            {/* Panel lateral */}
            <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-[#303747] bg-[#151a24] p-6 shadow-2xl entrada-lateral">

                {/* Encabezado */}
                <div className="mb-7 flex items-start justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff8b6a]">
                            Ficha de activo
                        </p>

                        <h2 className="mt-2 font-serif text-3xl">
                            {periferico?.marca} {periferico?.modelo}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onCerrar}
                        className="text-2xl text-[#b2b7c8] transition hover:text-white"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>

                {/* Código y estado */}
                <div className="rounded-xl bg-[#43252c] p-4">
                    <div className="flex justify-between text-sm font-bold">
                        <span>{periferico?.codigo}</span>

                        <span className="text-[#ffb36b]">
                            Asignado
                        </span>
                    </div>
                </div>

                {/* Información */}
                <dl className="mt-6 grid grid-cols-2 gap-4">
                    {isLoading ? (
                        <div>Cargando...</div>
                    ) :

                        error || periferico === null ? (
                            <div>Dispositivo no disponible</div>
                        )
                            : ([
                                ["Tipo", periferico.tipo],
                                ["Serie", periferico.serial],
                                ["Marca", periferico.marca],
                                ["Modelo", periferico.modelo],
                                ["Responsable", periferico.responsable],
                                ["Ubicación", periferico.ubicacion],
                                ["Conexion", periferico.conexion],
                                ["Puerto", periferico.puerto],

                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="border-b border-[#303747] pb-3"
                                >
                                    <dt className="text-[10px] uppercase text-[#b2b7c8]">
                                        {label}
                                    </dt>

                                    <dd className="mt-1 text-sm font-semibold">
                                        {value}
                                    </dd>
                                </div>
                            )))}
                </dl>

                {/* Historial 
                <h3 className="mt-8 font-serif text-xl">
                    Historial
                </h3>

                <div className="mt-4 space-y-4 border-l border-[#e35d62] pl-4">
                    <div>
                        <p className="text-sm font-bold">
                            Asignación registrada
                        </p>

                        <p className="text-xs text-[#b2b7c8]">
                            Camila Reyes · Casa Matriz · Piso 3
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

                 Acciones 
                <button
                    type="button"
                    className="action-button mt-8 w-full justify-center"
                >
                    <i
                        className="fa-solid fa-arrow-right-arrow-left"
                        aria-hidden="true"
                    />{" "}
                    Registrar movimiento
                </button>*/}
            </aside>
        </>
    );
}