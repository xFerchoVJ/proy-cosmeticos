import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const Cosmetico = db.define("costemicos", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export { Cosmetico };
