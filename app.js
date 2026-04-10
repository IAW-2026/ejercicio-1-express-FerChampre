const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variable en memoria para contar las visitas a la ruta raíz
let contadorVisitas = 0;

// Ruta raíz
app.get('/', (req, res) => {
  contadorVisitas++; // Incrementamos el contador por cada petición
  res.send(`
    <h1>Hola mundo!</h1>
    <p>La ruta raíz (/) ha sido visitada: <strong>${contadorVisitas}</strong> veces desde que se inició el servidor.</p>
  `);
});

// Middleware básico para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 