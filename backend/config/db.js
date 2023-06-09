import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_ROOT,
  process.env.DB_PASSWORD,
  {
    host: process.env.BD_HOST,
    port: 3306,
    dialect: "mysql",
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    console.log("Conectado exitosamente a la BD!");
  } catch (error) {
    console.log(`Error al conectar a la BD: ${error.message}`);
  }
};
export { connectDB, db };
