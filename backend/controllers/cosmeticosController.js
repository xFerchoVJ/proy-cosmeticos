import { request, response } from "express";
import { Cosmetico, Usuario } from "../models/index.js";

const agregarCosmetico = async (req = request, res = response) => {
  const cosmetico = await Cosmetico.create(req.body);
  const usuarioId = req.usuario.dataValues.id;
  cosmetico.usuarioId = usuarioId;
  try {
    const cosmeticoAlmacenado = await cosmetico.save();
    res.json(cosmeticoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerCosmeticos = async (req = request, res = response) => {
  const cosmeticos = await Cosmetico.findAll();
  res.json(cosmeticos);
};

const obtenerCosmetico = async (req = request, res = response) => {
  const { id } = req.params;
  const cosmetico = await Cosmetico.findByPk(id);
  if (!cosmetico) {
    const error = new Error("No existe el cosmetico");
    return res.status(404).json({ msg: error.message });
  }

  if (cosmetico.usuarioId !== req.usuario.dataValues.id) {
    const error = new Error("Accion no valida");
    return res.status(401).json({ msg: error.message });
  }
  res.json(cosmetico);
};

const editarCosmetico = async (req = request, res = response) => {
  const { id } = req.params;
  const cosmetico = await Cosmetico.findByPk(id);
  if (!cosmetico) {
    const error = new Error("No existe el cosmetico");
    return res.status(404).json({ msg: error.message });
  }

  cosmetico.nombre = req.body.nombre || cosmetico.nombre;
  cosmetico.descripcion = req.body.descripcion || cosmetico.descripcion;

  try {
    const cosmeticoActualizado = await cosmetico.save();
    res.status(200).json(cosmeticoActualizado);
  } catch (error) {
    console.log(`Error la actualizar el cosmetico: ${error}`);
  }
};
const eliminarCosmetico = async (req = request, res = response) => {
  const { id } = req.params;
  const cosmetico = await Cosmetico.findByPk(id);
  if (!cosmetico) {
    const error = new Error("No existe el cosmetico");
    return res.status(404).json({ msg: error.message });
  }

  if (cosmetico.usuarioId !== req.usuario.dataValues.id) {
    const error = new Error("Accion no valida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await cosmetico.destroy();
    res.json({ msg: "Cosmetico Eliminado" });
  } catch (error) {
    console.log(`Error la actualizar el cosmetico: ${error}`);
  }
};
export {
  agregarCosmetico,
  obtenerCosmeticos,
  obtenerCosmetico,
  editarCosmetico,
  eliminarCosmetico,
};
