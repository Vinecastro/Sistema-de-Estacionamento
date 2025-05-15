import db from "../db/db.js";
import { calcularValor } from "../utils/calcTime.js";

// Registrar entrada de veículo
export const registrarEntrada = (req, res) => {
  const { placa } = req.body;
  const entrada = new Date();

  const sql = "INSERT INTO veiculos (placa, entrada) VALUES (?, ?)";
  db.query(sql, [placa, entrada], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, placa, entrada });
  });
};

// Registrar saída de veículo
export const registrarSaida = (req, res) => {
  const id = req.params.id;
  const saida = new Date();

  const getSql = "SELECT entrada FROM veiculos WHERE id = ?";
  db.query(getSql, [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }

    const entrada = new Date(results[0].entrada);
    const { tempoTotal, valor } = calcularValor(entrada, saida);

    const updateSql = `
      UPDATE veiculos 
      SET saida = ?, tempo_total = ?, valor_pago = ? 
      WHERE id = ?
    `;
    db.query(updateSql, [saida, tempoTotal, valor, id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id, saida, tempoTotal, valor });
    });
  });
};

// Listar veículos que ainda estão no estacionamento
export const listarVeiculos = (req, res) => {
  const sql = "SELECT * FROM veiculos WHERE saida IS NULL";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Listar veículos que já saíram, formatando os dados
export const listarSaidas = (req, res) => {
  const sql = "SELECT * FROM veiculos WHERE saida IS NOT NULL ORDER BY saida DESC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar saídas" });

    const saidasFormatadas = results.map((veiculo) => ({
      id: veiculo.id,
      plate: veiculo.placa,
      entry: new Date(veiculo.entrada).toLocaleString(),
      exit: new Date(veiculo.saida).toLocaleString(),
      duration: veiculo.tempo_total,
      amount: veiculo.valor_pago != null ? Number(veiculo.valor_pago).toFixed(2) : null,
    }));

    res.status(200).json(saidasFormatadas);
  });
};
