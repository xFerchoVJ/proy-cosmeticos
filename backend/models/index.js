import { Usuario } from "./Usuario.js";
import { Cosmetico } from "./Cosmetico.js";

Cosmetico.belongsTo(Usuario, { foreignKey: "usuarioId" });

export { Usuario, Cosmetico };
