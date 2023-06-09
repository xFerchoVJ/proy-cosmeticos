import express from "express";
import {
  agregarCosmetico,
  editarCosmetico,
  eliminarCosmetico,
  obtenerCosmetico,
  obtenerCosmeticos,
} from "../controllers/cosmeticosController.js";
import isAuthenticated from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, agregarCosmetico)
  .get(isAuthenticated, obtenerCosmeticos);

router
  .route("/:id")
  .get(isAuthenticated, obtenerCosmetico)
  .put(isAuthenticated, editarCosmetico)
  .delete(isAuthenticated, eliminarCosmetico);
export default router;
