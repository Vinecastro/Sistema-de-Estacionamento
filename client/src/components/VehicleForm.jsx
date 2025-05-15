import React, { useState } from "react";
import api from "../services/api";
import "../styles/VehicleForm.css";

const VehicleForm = ({ onAdd }) => {
  const [plate, setPlate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!plate.trim()) return alert("Digite a placa.");

    try {
      await api.post("/entrada", { placa: plate.toUpperCase() });
      onAdd(); // Atualiza a lista de veículos
      setPlate("");
    } catch (err) {
      alert("Erro ao registrar entrada");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
        placeholder="ABC-1234"
        required
      />
      <button type="submit">Registrar Entrada</button>
    </form>
  );
};

export default VehicleForm;
