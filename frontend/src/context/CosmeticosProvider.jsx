import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const CosmeticosContext = createContext();

export const CosmeticosProvider = ({ children }) => {
  const [cosmeticos, setCosmeticos] = useState([]);
  const [cosmetico, setCosmetico] = useState({});

  useEffect(() => {
    const obtenerCosmeticos = async () => {
      try {
        const token = localStorage.getItem("apc_token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/cosmeticos", config);
        setCosmeticos(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCosmeticos();
  }, []);

  const guardarCosmetico = async (cosmetico) => {
    const token = localStorage.getItem("apc_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (cosmetico.id) {
      try {
        const { data } = await clienteAxios.put(
          `/cosmeticos/${cosmetico.id}`,
          cosmetico,
          config
        );
        const cosmeticosActualizados = cosmeticos.map((cosmeticoState) =>
          cosmeticoState.id === data.id ? data : cosmeticoState
        );
        setCosmeticos(cosmeticosActualizados);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/cosmeticos",
          cosmetico,
          config
        );
        const { createdAt, updatedAt, ...cosmeticoAlmacenado } = data;
        setCosmeticos([cosmeticoAlmacenado, ...cosmeticos]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setEdicion = (cosmeticoObj) => {
    setCosmetico(cosmeticoObj);
  };

  const eliminarCosmetico = async (id) => {
    const token = localStorage.getItem("apc_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const confirmar = confirm(
      "¿Confirmas que deseas eliminar este cosmetico? "
    );
    if (confirmar) {
      try {
        const { data } = await clienteAxios.delete(`/cosmeticos/${id}`, config);
        const cosmeticosActualizados = cosmeticos.filter(
          (cosmeticosState) => cosmeticosState.id !== data.id
        );
        setCosmeticos([cosmeticosActualizados, ...cosmeticos]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <CosmeticosContext.Provider
      value={{
        cosmeticos,
        guardarCosmetico,
        setEdicion,
        cosmetico,
        eliminarCosmetico,
      }}
    >
      {children}
    </CosmeticosContext.Provider>
  );
};

export default CosmeticosContext;
