import { useState } from "react";
import { Formulario } from "../components/Formulario";
import { ListadoPacientes } from "../components/ListadoPacientes";

export const AdministrarCosmeticos = () => {
  const [mostrarForm, setMostrarForm] = useState(true);
  return (
    <div className="flex flex-col md:flex-row">
      <button
        className="bg-indigo-600 text-white font-bold uppercase mx-10 mb-5 p-3 rounded-md md:hidden"
        onClick={() => setMostrarForm(!mostrarForm)}
      >
        {mostrarForm ? 'Ocultar Formulario' : 'Mostrar formulario'}
      </button>
      <div className={`${mostrarForm ? "block" : "hidden"}  md:w-1/2 lg:w-2/5 md:block`}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  );
};
