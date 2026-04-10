const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Procesar el envío del formulario
app.post('/contacto', (req, res) => {
  const { nombre, mensaje } = req.body;
  
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Datos Recibidos</title>
    </head>
    <body>
        <h1>Datos recibidos</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
        <a href="/">Volver al inicio</a>
    </body>
    </html>
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