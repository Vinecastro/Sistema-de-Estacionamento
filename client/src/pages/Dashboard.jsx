import React, { useEffect, useState } from "react";
import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import VehicleExit from "../components/VehicleExit";
import api from "../services/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [exitedVehicles, setExitedVehicles] = useState([]);

  // Buscar veículos estacionados
  const fetchAtivos = async () => {
    try {
      const response = await api.get("/ativos");
      setVehicles(response.data);
    } catch (error) {
      console.error("Erro ao buscar veículos ativos:", error);
    }
  };

  // Buscar veículos que já saíram
  const fetchSaidas = async () => {
    try {
      const response = await api.get("/saidas");
      setExitedVehicles(response.data);
    } catch (error) {
      console.error("Erro ao buscar veículos que saíram:", error);
    }
  };

  useEffect(() => {
    fetchAtivos();
    fetchSaidas();
  }, []);

  const handleAddVehicle = () => {
    fetchAtivos(); // Atualiza apenas os ativos após entrada
  };

  const handleExitVehicle = async (id) => {
    try {
      await api.put(`/saida/${id}`);
      fetchAtivos();
      fetchSaidas(); // Atualiza ambos após saída
    } catch (error) {
      console.error("Erro ao registrar saída:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Controle de Estacionamento</h1>

      <section>
        <VehicleForm onAdd={handleAddVehicle} />
      </section>

      <section>
        <VehicleList vehicles={vehicles} onExit={handleExitVehicle} />
      </section>

      <section>
        <VehicleExit exitedVehicles={exitedVehicles} />
      </section>
    </div>
  );
};

export default Dashboard;
