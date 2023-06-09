import express from "express";
import {
  registrar,
  perfil,
  confirmarCuenta,
  autenticar,
  olvidePassword,
  comprobarToken,
  cambiarPassword,
} from "../controllers/usuariosController.js";
import isAuthenticated from "../middleware/authMiddleware.js";
const router = express.Router();

//Rutas publicas
router.post("/registrar", registrar);
router.get("/confirmar-cuenta/:token", confirmarCuenta);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
router
  .route("/olvide-password/:token")
  .get(comprobarToken)
  .post(cambiarPassword);

//Rutas privadas
router.get("/perfil", isAuthenticated, perfil);

export default router;
