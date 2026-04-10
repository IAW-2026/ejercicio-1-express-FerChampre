const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos de la carpeta "public"
app.use(express.static('public'));

// Ruta /frase que devuelve una frase aleatoria en JSON
app.get('/frase', (req, res) => {
  const frases = [
    "El único límite a nuestra realización de mañana serán nuestras dudas de hoy.",
    "El éxito no es definitivo o el fracaso no es fatídico, es el coraje para continuar lo que cuenta.",
    "La innovación distingue a los líderes de los seguidores.",
    "No tienes que ser grande para empezar, pero tienes que empezar para ser grande.",
    "Mantén tu rostro hacia la luz del sol y no podrás ver la sombra."
  ];
  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
  res.json({ frase: fraseAleatoria });
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