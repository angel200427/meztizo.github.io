/* script_menu_navideño.js — versión FINAL funcional */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------ ❄️ Nieve animada ------------------ */
  const canvas = document.getElementById("snow-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let flakes = [];

    function resizeCanvas() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resizeCanvas);

    function initFlakes(count = 120) {
      flakes = [];
      for (let i = 0; i < count; i++) {
        flakes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 3 + 1,
          d: Math.random() * 1.5 + 0.5
        });
      }
    }
    initFlakes();

    let angle = 0;
    function drawFlakes() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      for (const f of flakes) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      moveFlakes();
      requestAnimationFrame(drawFlakes);
    }

    function moveFlakes() {
      angle += 0.01;
      for (const f of flakes) {
        f.y += Math.pow(f.d, 2) + 0.5;
        f.x += Math.sin(angle) * 1.5;
        if (f.y > H + 10) {
          f.y = -10;
          f.x = Math.random() * W;
        }
      }
    }

    drawFlakes();
  }

  /* ------------------ 🖼 Modal Imagen ------------------ */
  const imageModal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const imageClose = document.getElementById("imageClose");

  function openImageModal(src) {
    if (!imageModal || !modalImg) return;
    modalImg.src = src;
    imageModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeImageModal() {
    if (!imageModal) return;
    imageModal.style.display = "none";
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-view-image");
    if (btn) {
      const src = btn.dataset.img;
      if (src) openImageModal(src);
    }
  });

  if (imageClose) imageClose.addEventListener("click", closeImageModal);
  if (imageModal) {
    imageModal.addEventListener("click", (e) => {
      if (e.target === imageModal) closeImageModal();
    });
  }

  /* ------------------ 📅 Modal Reserva ------------------ */
  const reserveModal = document.getElementById("reserveModal");
  const modalContent = reserveModal?.querySelector(".modal-content");
  const modalTitle = document.getElementById("modalTitle");
  const modalMenuText = document.getElementById("modalMenuText");
  const modalClose = document.getElementById("modalClose");
  const cancelBtn = document.getElementById("cancelBtn");
  const reserveForm = document.getElementById("reserveForm");
  let selectedMenu = "";

  // Abrir modal
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-reserve");
    if (!btn) return;

    selectedMenu = btn.dataset.menu || btn.textContent.trim() || "Menú";
    if (modalTitle) modalTitle.textContent = `Reservar ${selectedMenu}`;
    if (modalMenuText) modalMenuText.textContent = `Has seleccionado ${selectedMenu}`;

    if (reserveModal) {
      reserveModal.classList.add("open");
      reserveModal.setAttribute("aria-hidden", "false");
      setTimeout(() => {
        document.getElementById("nombre")?.focus();
      }, 300);
    }
  });

  // Cerrar modal
  function closeReserveModal() {
    if (!reserveModal) return;
    reserveModal.classList.remove("open");
    reserveModal.setAttribute("aria-hidden", "true");
  }

  modalClose?.addEventListener("click", closeReserveModal);
  cancelBtn?.addEventListener("click", closeReserveModal);
  reserveModal?.addEventListener("click", (e) => {
    if (e.target === reserveModal) closeReserveModal();
  });

  // Envío del formulario (WhatsApp)
  reserveForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const personas = document.getElementById("personas").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const hora = document.getElementById("hora").value.trim();
    const detalle = document.getElementById("detalle").value.trim();

    if (!nombre || !personas || isNaN(personas) || Number(personas) < 1 || !fecha || !hora) {
      if (modalContent) {
        modalContent.classList.remove("shake");
        void modalContent.offsetWidth;
        modalContent.classList.add("shake");
        setTimeout(() => modalContent.classList.remove("shake"), 600);
      }
      return;
    }

    const mensaje = `Hola, soy ${nombre}. Quisiera reservar el ${selectedMenu} para ${personas} personas el ${fecha} a las ${hora}. ${detalle ? "Detalles: " + detalle : ""}`;
    const telefono = "593967944885"; // ⚠️ cambia por tu número si es otro
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    // abrir WhatsApp correctamente
    window.location.href = url;

    closeReserveModal();
    reserveForm.reset();
  });

  /* ------------------ ⬆️ Botón "Regresar al inicio" ------------------ */
  const btnTop = document.createElement("button");
  btnTop.id = "btnTop";
  btnTop.title = "Regresar al inicio";
  btnTop.innerHTML = "↑";
  btnTop.className = "btn-top";
  document.body.appendChild(btnTop);

  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function volverInicio() {
  window.location.href = "index.html";
}