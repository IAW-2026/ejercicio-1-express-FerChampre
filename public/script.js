const form = document.getElementById('contactoForm');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que la página se recargue

  const nombre = document.getElementById('nombre').value;
  const mensaje = document.getElementById('mensaje').value;

  try {
    const response = await fetch('/api/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, mensaje })
    });

    const data = await response.json();

    if (response.ok) {
      resultado.textContent = data.mensaje;
      resultado.className = '';
      form.reset(); // Limpia el formulario
    } else {
      resultado.textContent = data.mensaje || 'Hubo un error.';
      resultado.className = 'error';
    }
  } catch (err) {
    resultado.textContent = 'Error de conexión con el servidor.';
    resultado.className = 'error';
  }
});