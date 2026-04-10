const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Hola mundo!');
});

// Ruta para mostrar el formulario
app.get('/form', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Formulario de Lenguaje Favorito</title>
    </head>
    <body>
      <h2>Elige tu lenguaje favorito</h2>
      <form action="/form" method="POST">
        <label for="language">¿Cuál es tu lenguaje favorito?</label>
        <select name="language" id="language">
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="Ruby">Ruby</option>
        </select>
        <br><br>
        <button type="submit">Enviar</button>
      </form>
    </body>
    </html>
  `);
});

// Ruta para procesar el formulario
app.post('/form', (req, res) => {
  const language = req.body.language;
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Resultado</title>
    </head>
    <body>
      <h2>Resultado del formulario</h2>
      <p>Has elegido: <strong>${language || 'Ninguno'}</strong></p>
      <a href="/form">Volver</a>
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