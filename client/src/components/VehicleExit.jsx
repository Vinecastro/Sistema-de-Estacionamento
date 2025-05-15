import React from "react";
import "../styles/VehicleExit.css";

const VehicleExit = ({ exitedVehicles }) => (
  <div>
    <h2>Saídas</h2>
    <table>
      <thead>
        <tr>
          <th>Placa</th>
          <th>Entrada</th>
          <th>Saída</th>
          <th>Duração</th>
          <th>Valor Pago</th>
        </tr>
      </thead>
      <tbody>
      {exitedVehicles.map(({ id, plate, entry, exit, duration, amount }) => (
    <tr key={id}>
      <td data-label="Placa">{plate}</td>
      <td data-label="Entrada">{entry}</td>
      <td data-label="Saída">{exit}</td>
      <td data-label="Duração">{duration}</td>
      <td data-label="Valor Pago">R$ {amount}</td>
    </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default VehicleExit;
