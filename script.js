// Funciones para QR y compartir
function toggleOpciones() {
  const op = document.getElementById("opcionesCompartir");
  op.style.display = (op.style.display === "block") ? "none" : "block";
}
function toggleQR() {
  const qr = document.getElementById("qrImage");
  qr.style.display = (qr.style.display === "block") ? "none" : "block";
}
function copiarLink() {
  navigator.clipboard.writeText(window.location.href);
  alert("🔗 Link copiado al portapapeles");
}
function descargarQR() {
  const a = document.getElementById("linkDescargaQR");
  a.click();
}
function compartirFacebook() {
  window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href));
}
function compartirWhatsApp() {
  window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(window.location.href));
}

// ====== Ampliar imágenes ======
const imagenes = document.querySelectorAll(".galeria-grid img");
const modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);

imagenes.forEach(img => {
  img.addEventListener("click", () => {
    modal.innerHTML = `<img src="${img.src}" alt="Imagen ampliada">`;
    modal.classList.add("activo");
  });
});

modal.addEventListener("click", () => modal.classList.remove("activo"));

// ====== Reproducir videos al hacer clic ======
const videos = document.querySelectorAll(".galeria-grid-videos video");

videos.forEach(video => {
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      video.style.transform = "scale(1.05)";
    } else {
      video.pause();
      video.style.transform = "scale(1)";
    }
  });
});

