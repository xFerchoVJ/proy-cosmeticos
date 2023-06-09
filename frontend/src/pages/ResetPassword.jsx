import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import { Alerta } from "../components/Alerta";

export const ResetPassword = () => {
  const params = useParams();
  const { token } = params;

  const [cargando, setCargando] = useState(true);
  const [tokenConfirmado, setTokenConfirmado] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [passwordCambiada, setPasswordCambiada] = useState(false);
  useEffect(() => {
    const confirmarToken = async () => {
      try {
        const url = `/usuarios/olvide-password/${token}`;
        const { data } = await clienteAxios(url);
        setTokenConfirmado(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      setAlerta({
        msg: "El Password es obligatorio.",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El Password debe ser mayor a 6 caracteres.",
        error: true,
      });
      return;
    }
    setAlerta({});

    try {
      const { data } = await clienteAxios.post(
        `/usuarios/olvide-password/${token}`,
        {
          password,
        }
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordCambiada(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece tu Password y Comienza a Administrar{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}
        {tokenConfirmado && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Nuevo Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu Nuevo Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              />
            </div>
            <input
              type="submit"
              value="GUARDAR NUEVO PASSWORD"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer transition-colors hover:bg-indigo-900
            md:w-auto"
            />
            {passwordCambiada && (
              <Link to="/" className="block text-center my-5 text-gray-500">
                Inicia Sesión
              </Link>
            )}
          </form>
        )}
      </div>
    </>
  );
};
