import { useContext } from "react";
import CosmeticosContext from "../context/CosmeticosProvider";

const useCosmeticos = () => {
  return useContext(CosmeticosContext);
};

export default useCosmeticos;
