function enviarReserva(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const evento = document.getElementById("evento").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const personas = document.getElementById("personas").value;

  if (!nombre || !telefono || !fecha || !hora || !personas || !evento) {
    alert("Por favor completa todos los campos antes de enviar.");
    return;
  }

  const mensaje = `*Reserva de Mesa - Meztizo Restobar*%0A
👤 *Nombre:* ${nombre}%0A
📞 *Teléfono:* ${telefono}%0A
🎉 *Tipo de evento:* ${evento}%0A
📅 *Fecha:* ${fecha}%0A
⏰ *Hora:* ${hora}%0A
👥 *Personas:* ${personas}%0A`;

  const url = `https://wa.me/593967944885?text=${mensaje}`;
  window.open(url, "_blank");
}

function volverInicio() {
  window.location.href = "index.html";
}
