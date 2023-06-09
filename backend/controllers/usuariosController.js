import { request, response } from "express";
import bcrypt from "bcrypt";
import { Usuario } from "../models/index.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
  const { email, nombre } = req.body;
  const usuario = await Usuario.findOne({
    where: { email },
  });
  if (usuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const usuarioGuardado = await Usuario.create(req.body);
    await usuarioGuardado.save();

    //Enviar Email
    emailRegistro({
      email,
      nombre,
      token: usuarioGuardado.token,
    });

    res.json({ msg: `Usuario creado`, usuarioGuardado });
  } catch (error) {
    console.log(`Error al registrar al Usuario: ${error}`);
  }
};

const perfil = (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};

const confirmarCuenta = async (req = request, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ where: { token } });
  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (error) {
    console.log("Error al confirmar usuario", error);
  }
};

const autenticar = async (req = request, res = response) => {
  const { email, password } = req.body;
  const existeUsuario = await Usuario.findOne({ where: { email } });
  if (!existeUsuario) {
    const error = new Error("El usuario no existe");
    return res.status(403).json({ msg: error.message });
  }
  if (!existeUsuario.confirmado) {
    const error = new Error("El usuario no esta confirmado");
    return res.status(403).json({ msg: error.message });
  }
  if (await !existeUsuario.validarPassword(password)) {
    const error = new Error("Contraseña incorrecta");
    return res.status(403).json({ msg: error.message });
  }
  res.json({
    id: existeUsuario.id,
    nombre: existeUsuario.nombre,
    email: existeUsuario.email,
    token: generarJWT(existeUsuario.id),
  });
};

const olvidePassword = async (req = request, res = response) => {
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ where: { email } });

  if (!existeUsuario) {
    const error = new Error("El usuario no esta registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeUsuario.token = generarId();
    await existeUsuario.save();
    emailOlvidePassword({
      email,
      nombre: existeUsuario.nombre,
      token: existeUsuario.token,
    });
    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req = request, res = response) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ where: { token } });

  if (!tokenValido) {
    const error = new Error("El token no es valido");
    return res.status(400).json({ msg: error.message });
  }
  res.status(200).json({ msg: "Token valido y el usuario existe" });
};

const cambiarPassword = async (req = request, res = response) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    usuario.token = null;
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    await usuario.save();
    res.json({ msg: "Password modificada correctamente." });
  } catch (error) {
    console.log(error);
  }
};

export {
  registrar,
  perfil,
  confirmarCuenta,
  autenticar,
  olvidePassword,
  comprobarToken,
  cambiarPassword,
};
