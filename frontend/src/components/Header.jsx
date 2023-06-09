import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export const Header = () => {
  const { logout } = useAuth();
  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-3xl text-indigo-200 text-center">
          Administrador de{" "}
          <span className="text-white font-black">Cosmeticos</span>
        </h1>

        <nav className="flex gap-4 flex-col items-center lg:flex-row mt-5 lg:mt-0">
          <button
            type="submit"
            className="text-white text-sm uppercase font-bold hover:text-indigo-200 transition-colors	"
            onClick={logout}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};
