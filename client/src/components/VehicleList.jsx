import React from "react";
import "../styles/VehicleList.css";

const VehicleList = ({ vehicles, onExit }) => (
  <div>
    <h2>Estacionados</h2>
    <table>
      <thead>
        <tr>
          <th>Placa</th>
          <th>Entrada</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
      {vehicles.map(({ id, placa, entrada }) => (
    <tr key={id}>
      <td data-label="Placa">{placa}</td>
      <td data-label="Entrada">{new Date(entrada).toLocaleString("pt-BR")}</td>
      <td data-label="Ação">
        <button onClick={() => onExit(id)}>Registrar Saída</button>
      </td>
    </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default VehicleList;
