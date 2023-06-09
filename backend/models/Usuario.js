import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const Usuario = db.define(
  "usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: generarId(),
    },
    confirmado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    hooks: {
      beforeCreate: async function (veterinario) {
        const salt = await bcrypt.genSalt(10);
        veterinario.password = await bcrypt.hash(veterinario.password, salt);
      },
    },
    scopes: {
      eliminarPassword: {
        attributes: {
          exclude: [
            "password",
            "token",
            "confirmado",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    },
  }
);

Usuario.prototype.validarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export { Usuario };
