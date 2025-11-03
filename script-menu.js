function volverInicio() {
  window.location.href = "index.html";
}
function toggleOpciones() {
  const opciones = document.getElementById("opcionesCompartir");
  opciones.style.display = opciones.style.display === "flex" ? "none" : "flex";
}

function toggleQR() {
  const qr = document.getElementById("qrImage");
  qr.style.display = qr.style.display === "none" || qr.style.display === "" ? "block" : "none";
}

function copiarLink() {
  const link = window.location.href; // copia el link actual de la página
  navigator.clipboard.writeText(link).then(() => {
    alert("🔗 Link copiado al portapapeles!");
  });
}

function descargarQR() {
  const enlace = document.getElementById("linkDescargaQR");
  enlace.click();
}

function compartirFacebook() {
  const link = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/profile.php?id=61575278036063`, "_blank");
}

function compartirWhatsApp() {
  const link = encodeURIComponent(window.location.href);
  window.open(`https://wa.me/593967944885?text=${texto}`, "_blank");
}
