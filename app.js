const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir archivos estáticos

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola mundo! Ve a /index.html para ver el formulario.');
});

// Endpoint POST para contacto
app.post('/api/contacto', (req, res) => {
  const { nombre, mensaje } = req.body;
  
  if (!nombre) {
    return res.status(400).json({ mensaje: "Por favor, ingresa tu nombre." });
  }

  res.json({ mensaje: `¡Hola ${nombre}! Hemos recibido tu mensaje correctamente.` });
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