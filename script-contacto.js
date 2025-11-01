function enviarMensaje(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !email || !mensaje) {
    alert("Por favor completa todos los campos antes de enviar.");
    return;
  }

  const texto = `📩 *Nuevo mensaje desde Meztizo Restobar* %0A
👤 *Nombre:* ${nombre}%0A
📧 *Email:* ${email}%0A
💬 *Mensaje:* ${mensaje}`;

  // Número de WhatsApp (puedes cambiarlo)
  const url = `https://wa.me/593967944885?text=${texto}`;
  window.open(url, "_blank");
}

function volverInicio() {
  window.location.href = "index.html";
}
