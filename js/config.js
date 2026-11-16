/* =========================================================
   CONFIGURACIÓN DEL SITIO — edita solo este archivo
   Todo lo que diga "[por confirmar]" debe validarlo el cliente.
   ========================================================= */
window.AMOR_VIAJERO = {
  nombre: 'Casa Hostal Amor Viajero',
  ubicacion: 'Río Cañas, San Francisco, Cundinamarca, Colombia',

  whatsapp: {
    // numero: formato internacional sin "+" ni espacios (57 = Colombia)
    // visible: como se muestra en pantalla
    lineas: [
      { nombre: 'Línea 1', numero: '573108545283', visible: '+57 310 854 5283' },
      { nombre: 'Línea 2', numero: '573222321095', visible: '+57 322 232 1095' },
      { nombre: 'Línea 3', numero: '573138022446', visible: '+57 313 802 2446' }
    ],
    // Línea que usan el botón flotante y los botones generales (0 = la primera)
    principal: 0
  },

  // Mensaje si la página no define uno propio (data-wa-msg en <html>)
  mensajePorDefecto: 'Hola, vengo del sitio web y quiero información.',

  // No inventar: dejar así hasta que el cliente confirme
  horarioAtencion: '[por confirmar]',

  // URLs de redes sociales [por confirmar]
  redes: {
    instagram: '#',
    tiktok: '#'
  }
};
