import { request } from "express";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";
const isAuthenticated = async (req = request, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Usuario.scope("eliminarPassword").findByPk(
        decoded.id
      );
      return next();
    } catch (err) {
      const error = new Error("Token no valido o inexistente");
      return res.status(403).json({ msg: error.message });
    }
  }
  if (!token) {
    const error = new Error("Token no valido o inexistente");
    return res.status(403).json({ msg: error.message });
  }
  next();
};

export default isAuthenticated;
