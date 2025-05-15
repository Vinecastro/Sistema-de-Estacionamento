// api/utils/calcTime.js
export function calcularValor(entrada, saida) {
    const diffMs = saida - entrada;
    const diffHoras = Math.ceil(diffMs / (1000 * 60 * 60));
  
    let valor = 10; // Primeira hora
    if (diffHoras > 1) {
      valor += (diffHoras - 1) * 5;
    }
  
    const tempoTotal = `${diffHoras} hora(s)`;
    return { tempoTotal, valor };
  }
  