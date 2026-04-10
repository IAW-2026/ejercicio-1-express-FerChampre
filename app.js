const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Simulación de una base de datos de productos (Array de objetos)
const productos = [
  { id: 1, nombre: 'Laptop', precio: 1200 },
  { id: 2, nombre: 'Mouse Inalámbrico', precio: 25 },
  { id: 3, nombre: 'Teclado Mecánico', precio: 80 },
  { id: 4, nombre: 'Monitor 24"', precio: 150 }
];

// Ruta para la API de productos (devuelve JSON)
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
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