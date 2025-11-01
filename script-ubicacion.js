// script-ubicacion.js
// Animaciones y comportamiento para ubicacion.html

// Al cargar el DOM activamos el zoom-in del mapa
document.addEventListener('DOMContentLoaded', () => {
  const zoomWrap = document.querySelector('.zoom-wrap .map-frame');
  if (zoomWrap) {
    // Delay para que la transición sea notoria
    setTimeout(() => zoomWrap.classList.add('zoomin'), 200);
  }

  // Pequeña animación en el header
  const header = document.querySelector('.header');
  if (header) header.style.transform = 'translateY(-6px)';
  setTimeout(() => header.style.transform = 'translateY(0)', 300);
});

// Función para volver al inicio (ajusta la ruta si es necesario)
function volverInicio(){
  // Si prefieres una navegación SPA, reemplaza por tu lógica
  window.location.href = 'index.html';
}

// Manejo de errores del iframe (siempre limitado por las políticas del navegador)
const gmaps = document.getElementById('gmaps');
if (gmaps) {
  gmaps.addEventListener('error', () => {
    console.warn('Error cargando Google Maps - comprueba la URL o las políticas de contenido.');
  });
}

// Recomendación en consola para depuración
console.info('script-ubicacion cargado — mapa con efecto zoom-in activado');
