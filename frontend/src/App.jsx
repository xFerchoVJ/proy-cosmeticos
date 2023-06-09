import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CosmeticosProvider } from "./context/CosmeticosProvider";
import { AuthLayout } from "./layout/AuthLayout";
import { RutaProtegida } from "./layout/RutaProtegida";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgetPassword } from "./pages/ForgetPassword";
import { ConfirmarAccount } from "./pages/ConfirmarAccount";
import { ResetPassword } from "./pages/ResetPassword";
import { AdministrarCosmeticos } from "./pages/AdministrarCosmeticos";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CosmeticosProvider>
          {/* Rutas publicas */}
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route path="olvide-password" element={<ForgetPassword />} />
              <Route
                path="olvide-password/:token"
                element={<ResetPassword />}
              />
              <Route
                path="confirmar-cuenta/:id"
                element={<ConfirmarAccount />}
              />
            </Route>

            {/* Rutas de autentication */}
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarCosmeticos />} />
            </Route>
          </Routes>
        </CosmeticosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
