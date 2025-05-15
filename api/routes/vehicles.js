import express from "express";
import {
  registrarEntrada,
  registrarSaida,
  listarVeiculos,
  listarSaidas, // <--- já está importado aqui
} from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/entrada", registrarEntrada);
router.put("/saida/:id", registrarSaida);
router.get("/ativos", listarVeiculos);

// ✅ Apenas uma vez já está ótimo!
router.get("/saidas", listarSaidas);

export default router;
