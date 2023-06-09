import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import cosmeticosRoutes from "./routes/cosmeticosRoutes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
connectDB();

const dominiosPermitidos = [process.env.FRONT_URL, process.env.PORT];
const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) != -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/cosmeticos", cosmeticosRoutes);

app.listen(port, () => {
  console.log(`Conectado al puerto: ${port}`);
});
