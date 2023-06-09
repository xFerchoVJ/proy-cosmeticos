import useCosmeticos from "../hooks/useCosmeticos";
import { Cosmetico } from "./Cosmetico";

export const ListadoPacientes = () => {
  const { cosmeticos } = useCosmeticos();

  return (
    <>
      {cosmeticos.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado Cosmeticos
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus{" "}
            <span className="text-indigo-600 font-bold">Cosmeticos</span>
          </p>

          {cosmeticos.map((cosmetico) => (
            <Cosmetico key={cosmetico.id} cosmetico={cosmetico} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay cosmeticos</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando Cosmeticos{" "}
            <span className="text-indigo-600 font-bold">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};
