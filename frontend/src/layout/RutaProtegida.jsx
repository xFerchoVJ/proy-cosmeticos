import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
export const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return console.log("cargando...");
  return (
    <div>
      <Header />
      {auth?.id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </div>
  );
};
