
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const TASA_CAMBIO = 0.85;

console.clear();
console.log('\n─── CONVERTIDOR DE MONEDA ───');
console.log(`Tasa fijada: 1 USD ➔ ${TASA_CAMBIO} EUR\n`);

rl.question('▸ Ingresa el monto (USD): $', (entrada) => {
  const usd = parseFloat(entrada);

  // Validación de la entrada
  if (isNaN(usd) || usd < 0) {
    console.log('\n✕ Error: Ingrese un número válido y mayor a cero.\n');
  } else {
    // Cálculo de la conversión
    const eur = (usd * TASA_CAMBIO).toFixed(2);

    // Muestra limpia del resultado
    console.log('\n─────────────────────────────');
    console.log(`  $${usd.toFixed(2)} USD  ➔  €${eur} EUR`);
    console.log('─────────────────────────────\n');
  }

  // Cierre de la interfaz
  rl.close();
});