// src/utils/calcTime.js

export default function calcTime(entrada, saida) {
    const entradaDate = new Date(entrada);
    const saidaDate = new Date(saida);
  
    // Calcula a diferença em milissegundos
    const diffMs = saidaDate - entradaDate;
  
    // Converte para horas (arredondando para cima)
    const diffHoras = Math.ceil(diffMs / (1000 * 60 * 60));
  
    // Tarifa: R$10,00 pela 1ª hora + R$5,00 pelas horas adicionais
    const valor = diffHoras <= 1 ? 10 : 10 + (diffHoras - 1) * 5;
  
    return {
      tempo: diffHoras,
      valor: valor.toFixed(2) // retorna como string formatada com 2 casas decimais
    };
  }
  