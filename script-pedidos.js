// script-pedidos.js

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".item input[type='number']");
  const listaResumen = document.getElementById("listaResumen");
  const subtotalEl = document.getElementById("subtotal");
  const contenedorEl = document.getElementById("contenedor");
  const totalEl = document.getElementById("total");

  const PRECIO_CONTENEDOR = 0.50;

  inputs.forEach(input => {
    input.addEventListener("input", actualizarResumen);
  });

  function actualizarResumen() {
    listaResumen.innerHTML = "";
    let subtotal = 0;
    let totalContenedores = 0;

    inputs.forEach(input => {
      const cantidad = parseInt(input.value) || 0;
      const nombre = input.dataset.nombre;
      const precio = parseFloat(input.dataset.precio);

      if (cantidad > 0) {
        const totalProducto = cantidad * precio;
        const contenedoresProducto = cantidad * PRECIO_CONTENEDOR;

        subtotal += totalProducto;
        totalContenedores += contenedoresProducto;

        const li = document.createElement("li");
        li.textContent = `${cantidad}x ${nombre} - $${totalProducto.toFixed(2)} (+ $${contenedoresProducto.toFixed(2)} contenedores)`;
        listaResumen.appendChild(li);
      }
    });

    subtotalEl.textContent = subtotal.toFixed(2);
    contenedorEl.textContent = totalContenedores.toFixed(2);
    totalEl.textContent = (subtotal + totalContenedores).toFixed(2);
  }

  // 🟢 Enviar pedido por WhatsApp
  window.enviarWhatsApp = function () {
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    if (!nombre || !telefono || !direccion) {
      alert("Por favor completa todos los datos del cliente.");
      return;
    }

    let mensaje = `*🛵 Pedido a Domicilio - Meztizo Restobar*\n\n`;
    mensaje += `👤 *Cliente:* ${nombre}\n📞 *Teléfono:* ${telefono}\n🏠 *Dirección:* ${direccion}\n\n`;
    mensaje += `*Detalle del Pedido:*\n`;

    inputs.forEach(input => {
      const cantidad = parseInt(input.value) || 0;
      const nombreProd = input.dataset.nombre;
      const precio = parseFloat(input.dataset.precio);

      if (cantidad > 0) {
        const totalProducto = cantidad * precio;
        const contenedoresProducto = cantidad * PRECIO_CONTENEDOR;
        mensaje += `• ${cantidad}x ${nombreProd} - $${totalProducto.toFixed(2)} + $${contenedoresProducto.toFixed(2)} contenedores\n`;
      }
    });

    mensaje += `\n🧾 *Subtotal:* $${subtotalEl.textContent}`;
    mensaje += `\n📦 *Contenedores:* $${contenedorEl.textContent}`;
    mensaje += `\n💰 *Total:* $${totalEl.textContent}`;
    mensaje += `\n\n✅ Gracias por tu pedido ❤️`;

    const url = `https://wa.me/593967944885?text=${encodeURIComponent(mensaje)}`; // Reemplaza con tu número de WhatsApp
    window.open(url, "_blank");
  };

  // 🔙 Volver al inicio
  window.volverInicio = function () {
    window.location.href = "index.html";
  };
});
