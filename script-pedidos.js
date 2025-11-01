// Actualiza el resumen en tiempo real
const inputs = document.querySelectorAll('.item input');
const listaResumen = document.getElementById('listaResumen');
const totalEl = document.getElementById('total');

inputs.forEach(input => {
  input.addEventListener('input', actualizarResumen);
});

function actualizarResumen() {
  listaResumen.innerHTML = '';
  let total = 0;

  inputs.forEach(input => {
    const cantidad = parseInt(input.value);
    if (cantidad > 0) {
      const nombre = input.dataset.nombre;
      const precio = parseFloat(input.dataset.precio);
      const subtotal = precio * cantidad;
      total += subtotal;

      const li = document.createElement('li');
      li.textContent = `${cantidad}x ${nombre} - $${subtotal.toFixed(2)}`;
      listaResumen.appendChild(li);
    }
  });

  totalEl.textContent = total.toFixed(2);
}

function enviarWhatsApp() {
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const direccion = document.getElementById('direccion').value.trim();

  if (!nombre || !telefono || !direccion) {
    alert('Por favor completa todos los datos del cliente.');
    return;
  }

  let mensaje = `*Nuevo Pedido Meztizo Restobar*%0A`;
  mensaje += `👤 *Nombre:* ${nombre}%0A📞 *Teléfono:* ${telefono}%0A🏠 *Dirección:* ${direccion}%0A%0A`;
  mensaje += `🧾 *Detalle del pedido:*%0A`;

  inputs.forEach(input => {
    const cantidad = parseInt(input.value);
    if (cantidad > 0) {
      const nombreProd = input.dataset.nombre;
      const precio = parseFloat(input.dataset.precio);
      mensaje += `${cantidad}x ${nombreProd} - $${(precio * cantidad).toFixed(2)}%0A`;
    }
  });

  mensaje += `%0A💰 *Total:* $${totalEl.textContent}%0A`;
  const url = `https://wa.me/593967944885?text=${mensaje}`;
  window.open(url, '_blank');
}

function volverInicio() {
  window.location.href = 'index.html';
}
