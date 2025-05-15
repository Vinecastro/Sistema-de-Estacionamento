import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import veiculoRoutes from "./routes/vehicles.js";
import db from "./db/db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://estacionamento-sigma.vercel.app"]
}));

app.use(express.json());

app.use("/api/veiculos", veiculoRoutes);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
