// ============================
// 📌 VARIABLES Y ELEMENTOS
// ============================
let toqueContador = 0;
const preguntas = ["comida", "servicio", "ambiente"];
const panel = document.createElement("div");

// Crear panel deslizable
panel.id = "panel";
panel.innerHTML = `
  <h2>📊 Resultados de Calificaciones</h2>
  <div id="resultados"></div>
  <h2>📝 Reseñas Guardadas</h2>
  <div id="reseñasGuardadas"></div>
  <button class="close-btn" onclick="cerrarPanel()">Cerrar</button>
`;
document.body.appendChild(panel);

// ============================
// ⭐ FUNCIÓN PARA CALIFICAR
// ============================
function calificar(pregunta, valor) {
  let datos = JSON.parse(localStorage.getItem("calificaciones")) || {};
  if (!datos[pregunta]) datos[pregunta] = [];
  datos[pregunta].push(valor);
  localStorage.setItem("calificaciones", JSON.stringify(datos));
  mostrarMensaje(`Gracias por calificar la ${pregunta} con ${valor} ⭐`);
}

// ============================
// ✅ MENSAJE DE CONFIRMACIÓN
// ============================
function mostrarMensaje(texto) {
  const resultado = document.getElementById("resultado");
  resultado.textContent = texto;
  resultado.style.animation = "fadeIn 0.5s";
}

// ============================
// ✍️ GUARDAR RESEÑA
// ============================
function guardarReseña() {
  const texto = document.getElementById("reseña").value.trim();
  if (texto === "") {
    mostrarMensaje("Por favor, escribe una reseña antes de guardar.");
    return;
  }

  let reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
  reseñas.push({ texto, fecha: new Date().toLocaleString() });
  localStorage.setItem("reseñas", JSON.stringify(reseñas));

  document.getElementById("reseña").value = "";
  mostrarMensaje("¡Gracias! Tu reseña ha sido guardada.");
}

// ============================
// 📊 MOSTRAR RESULTADOS
// ============================
function mostrarResultados() {
  let datos = JSON.parse(localStorage.getItem("calificaciones")) || {};
  let html = "";

  preguntas.forEach((pregunta) => {
    if (datos[pregunta] && datos[pregunta].length > 0) {
      const suma = datos[pregunta].reduce((a, b) => a + b, 0);
      const promedio = (suma / datos[pregunta].length).toFixed(1);
      html += `<p>⭐ <strong>${pregunta.toUpperCase()}</strong>: ${promedio} (de ${datos[pregunta].length} votos)</p>`;
    } else {
      html += `<p>⭐ <strong>${pregunta.toUpperCase()}</strong>: Sin datos aún</p>`;
    }
  });

  document.getElementById("resultados").innerHTML = html;

  // Mostrar reseñas guardadas
  const reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
  const reseñasHTML = reseñas.length
    ? reseñas.map(r => `<div class="reseña-item"><strong>${r.fecha}</strong><br>${r.texto}</div>`).join("")
    : "<p>No hay reseñas aún.</p>";

  document.getElementById("reseñasGuardadas").innerHTML = reseñasHTML;
}

// ============================
// 🎛 PANEL DESLIZABLE
// ============================
function cerrarPanel() {
  panel.classList.remove("active");
}

document.body.addEventListener("click", () => {
  toqueContador++;
  if (toqueContador >= 5) {
    mostrarResultados();
    panel.classList.add("active");
    toqueContador = 0;
  }
});

// ============================
// 🔙 VOLVER AL INICIO
// ============================
function volverInicio() {
  window.location.href = "index.html";
}

// ============================
// 🔧 ACTIVAR ESTRELLAS
// ============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".estrellas").forEach((grupo) => {
    const pregunta = grupo.getAttribute("data-pregunta");
    const estrellas = grupo.querySelectorAll("span");

    estrellas.forEach((estrella, index) => {
      estrella.addEventListener("click", () => {
        calificar(pregunta, index + 1);
        estrellas.forEach((e, i) => {
          e.style.transform = i <= index ? "scale(1.3)" : "scale(1)";
          e.style.textShadow = i <= index ? "0 0 10px white" : "none";
        });
      });
    });
  });
});
