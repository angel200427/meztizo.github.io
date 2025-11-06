// script-reserva.js

function enviarReserva(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const evento = document.getElementById("evento").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const personas = document.getElementById("personas").value;
  const tipoPersonas = document.querySelector('input[name="tipo-personas"]:checked').value;

  if (!nombre || !telefono || !fecha || !hora || !personas || !evento) {
    alert("⚠️ Por favor completa todos los campos antes de enviar.");
    return;
  }

  // ✅ Mensaje de WhatsApp
  const mensaje = `
*📝 Reserva de Mesa - Meztizo Restobar*
👤 *Nombre:* ${nombre}
📞 *Teléfono:* ${telefono}
🎉 *Evento:* ${evento}
📅 *Fecha:* ${fecha}
⏰ *Hora:* ${hora}
👥 *Personas:* ${personas} (${tipoPersonas})
`;

  // ✅ Cambia el número de WhatsApp si es necesario
  const numeroWhatsApp = "593967944885";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}

// 🔙 Botón para volver al inicio
function volverInicio() {
  window.location.href = "index.html";
}
