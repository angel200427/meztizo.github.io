// ============================
// 📌 VARIABLES Y ELEMENTOS
// ============================
let toqueContador = 0; // Para el panel secreto
const preguntas = ["comida", "servicio", "ambiente"];
const panel = document.createElement("div");

// Crear panel deslizable de resultados
panel.id = "panel";
panel.innerHTML = `
  <h2>📊 Resultados de Calificaciones</h2>
  <div id="resultados"></div>
  <button class="close-btn" onclick="cerrarPanel()">Cerrar</button>
`;
document.body.appendChild(panel);

// ============================
// ⭐ FUNCIÓN PARA CALIFICAR
// ============================
function calificar(pregunta, valor) {
  let datos = JSON.parse(localStorage.getItem("calificaciones")) || {};

  if (!datos[pregunta]) {
    datos[pregunta] = [];
  }
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
}

// ============================
// 🎛 PANEL DESLIZABLE
// ============================
function cerrarPanel() {
  panel.classList.remove("active");
}

// Mostrar panel al hacer 5 toques en pantalla
document.body.addEventListener("click", () => {
  toqueContador++;
  if (toqueContador >= 5) {
    mostrarResultados();
    panel.classList.add("active");
    toqueContador = 0; // Reiniciar contador
  }
});

// ============================
// 🔙 FUNCIÓN VOLVER AL INICIO
// ============================
function volverInicio() {
  window.location.href = "index.html"; // Cambia al nombre de tu archivo principal
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

        // Animación de selección visual
        estrellas.forEach((e, i) => {
          e.style.transform = i <= index ? "scale(1.3)" : "scale(1)";
          e.style.textShadow = i <= index ? "0 0 10px white" : "none";
        });
      });
    });
  });
});
