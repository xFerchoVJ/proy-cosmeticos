import { useState, useEffect } from "react";
import { Alerta } from "../components/Alerta";
import useCosmeticos from "../hooks/useCosmeticos";

export const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [alerta, setAlerta] = useState({});
  const { guardarCosmetico, cosmetico } = useCosmeticos();
  const [id, setId] = useState(null);
  useEffect(() => {
    if (cosmetico?.nombre) {
      setNombre(cosmetico.nombre);
      setDescripcion(cosmetico.descripcion);
      setId(cosmetico.id);
    }
  }, [cosmetico]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, descripcion].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    setAlerta({});
    guardarCosmetico({ nombre, descripcion, id });
    setNombre("");
    setDescripcion("");
  };

  const { msg } = alerta;
  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Cosmeticos
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus Cosmeticos y{" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
            Nombre Cosmetico
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            placeholder="Nombre del Cosmetico"
            className="border-2 w-full p-2 mt-2 gray-400 rounded-md"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="text-gray-700 uppercase font-bold"
          >
            Descripión Cosmetico
          </label>
          <textarea
            name="descripcion"
            id="descripcion"
            cols="30"
            rows="10"
            placeholder="Descripción del Cosmetico"
            className="border-2 w-full p-2 mt-2 gray-400 rounded-md resize-none"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
        <input
          type="submit"
          value={id ? `Actualizar Cosmetico` : "Agregar Cosmetico"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 transition-colors	cursor-pointer rounded-lg"
        />
      </form>
    </>
  );
};
