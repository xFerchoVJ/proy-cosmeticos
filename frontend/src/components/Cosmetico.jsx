import useCosmeticos from "../hooks/useCosmeticos";
export const Cosmetico = ({ cosmetico }) => {
  const { nombre, descripcion, id } = cosmetico;
  const { setEdicion, eliminarCosmetico } = useCosmeticos();
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-600">
        Nombre:{" "}
        <span className="font-normal normal-cases text-black">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-indigo-600 mt-2">
        Descripcion:{" "}
        <span className="font-normal normal-cases text-black">
          {descripcion}
        </span>
      </p>
      <div className="flex justify-between my-5">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg transition-colors"
          onClick={() => setEdicion(cosmetico)}
        >
          EDITAR
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg transition-colors"
          onClick={() => eliminarCosmetico(cosmetico.id)}
        >
          ELIMINAR
        </button>
      </div>
    </div>
  );
};
