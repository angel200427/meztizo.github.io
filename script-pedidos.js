let pedidoTemporal = null;
let proteinaSeleccionada = null;

function volverInicio() {
  window.location.href = "index.html";
}

// === CALCULAR PEDIDO Y CONTENEDOR ===
document.querySelectorAll('input[type="number"]').forEach(input => {
  input.addEventListener('input', actualizarResumen);
});

function actualizarResumen() {
  const lista = document.getElementById('listaResumen');
  const subtotalEl = document.getElementById('subtotal');
  const contenedorEl = document.getElementById('contenedor');
  const totalEl = document.getElementById('total');

  lista.innerHTML = '';
  let subtotal = 0;
  let tienePedido = false;

  document.querySelectorAll('input[type="number"]').forEach(input => {
    const cantidad = parseInt(input.value);
    const nombre = input.dataset.nombre;
    const precio = parseFloat(input.dataset.precio);

    if (cantidad > 0) {
      tienePedido = true;
      let texto = `${cantidad} x ${nombre}`;
      if (input.dataset.proteina) texto += ` (${input.dataset.proteina})`;
      const totalItem = (cantidad * precio).toFixed(2);
      subtotal += cantidad * precio;

      const li = document.createElement('li');
      li.textContent = `${texto} - $${totalItem}`;
      lista.appendChild(li);
    }
  });

  subtotalEl.textContent = subtotal.toFixed(2);
  contenedorEl.textContent = tienePedido ? '0.50' : '0.00';
  totalEl.textContent = tienePedido ? (subtotal + 0.50).toFixed(2) : '0.00';
}

// === MODAL DE PROTEÍNA ===
const modal = document.getElementById('modalProteina');
const confirmarBtn = document.getElementById('confirmarProteina');

document.querySelectorAll('input[data-nombre*="con proteína"]').forEach(input => {
  input.addEventListener('change', e => {
    if (parseInt(e.target.value) > 0) {
      pedidoTemporal = e.target;
      modal.style.display = 'flex';
      modal.classList.add('mostrar');
    }
  });
});

document.querySelectorAll('.opciones-proteina button').forEach(btn => {
  btn.addEventListener('click', e => {
    proteinaSeleccionada = e.target.dataset.proteina;
    document.querySelectorAll('.opciones-proteina button').forEach(b => b.classList.remove('activo'));
    e.target.classList.add('activo');
  });
});

confirmarBtn.addEventListener('click', () => {
  if (!proteinaSeleccionada) {
    alert('Por favor selecciona una proteína.');
    return;
  }
  pedidoTemporal.dataset.proteina = proteinaSeleccionada;
  modal.style.display = 'none';
  modal.classList.remove('mostrar');
  proteinaSeleccionada = null;
  actualizarResumen();
});

// === ENVIAR A WHATSAPP ===
function enviarWhatsApp() {
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  if (!nombre || !telefono || !direccion) {
    alert('Por favor completa tus datos.');
    return;
  }

  const lista = document.querySelectorAll('#listaResumen li');
  if (lista.length === 0) {
    alert('Selecciona al menos un producto.');
    return;
  }

  let mensaje = `Hola Meztizo Restobar, soy ${nombre}. Quiero pedir:\n\n`;
  lista.forEach(li => mensaje += `• ${li.textContent}\n`);
  const total = document.getElementById('total').textContent;
  mensaje += `\nTotal: $${total} (incluye contenedor)\n📍 Dirección: ${direccion}\n📞 Tel: ${telefono}`;

  const url = `https://wa.me/593967944885?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
