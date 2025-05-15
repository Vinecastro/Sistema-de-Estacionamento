import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import veiculoRoutes from "./routes/vehicles.js";
import db from "./db/db.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.use("/api/veiculos", veiculoRoutes);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
