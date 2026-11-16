/* =========================================================
   CONTENIDO EDITABLE — números, enlaces, mensajes y datos pendientes
   Todo lo que diga "[por confirmar]" debe validarlo el cliente.
   ========================================================= */
window.AMOR_VIAJERO = {
  nombre: 'Casa Hostal Amor Viajero',
  // [por confirmar] nombre exacto de la vereda
  ubicacion: 'Vereda El Peñón · Río Cañas, San Francisco, Cundinamarca, a 1 hora de Bogotá',
  ubicacionPendiente: '[por confirmar nombre exacto de la vereda]',

  /* ---------- WhatsApp ---------- */
  whatsapp: {
    // numero: formato internacional sin "+" ni espacios (57 = Colombia)
    lineas: [
      // [por confirmar] Línea principal. Otra fuente muestra 310 854 5274:
      //   si esa es la correcta, usar { numero: '573108545274', visible: '+57 310 854 5274' }
      { numero: '573108545283', visible: '+57 310 854 5283' },
      { numero: '573222321095', visible: '+57 322 232 1095' },
      { numero: '573138022446', visible: '+57 313 802 2446' }
    ],
    // Línea del botón flotante y de todos los botones (0 = la primera)
    principal: 0
  },

  // Mensajes prellenados. En el HTML se usan así: data-wa="glampingDomo"
  mensajes: {
    general:        'Hola, vengo del sitio web y quiero información.',
    alojamiento:    'Hola, quiero información sobre el alojamiento.',
    glamping:       'Hola, quiero reservar glamping para el [fecha].',
    glampingDomo:   'Hola, quiero reservar el glamping domo de madera para el [fecha].',
    glampingGlobos: 'Hola, quiero reservar el glamping globos para el [fecha].',
    habitaciones:   'Hola, quiero reservar una habitación del hotel para el [fecha].',
    camping:        'Hola, quiero información de camping y casas rodantes para el [fecha].',
    experiencias:   'Hola, quiero información de las experiencias.',
    pasadia:        'Hola, quiero información del pasadía.',
    rio:            'Hola, quiero información sobre el plan de río.',
    cuatrimotos:    'Hola, quiero información de los paseos en cuatrimoto.',
    restaurante:    'Hola, quiero información del restaurante.',
    eventos:        'Hola, quiero información de los próximos eventos.',
    comoLlegar:     'Hola, quiero indicaciones para llegar al hostal.',
    preguntas:      'Hola, tengo una pregunta que no está en las preguntas frecuentes.'
  },

  /* ---------- Precios de referencia [por confirmar con el cliente] ----------
     Únicos precios del sitio. Se muestran como "Desde $X por noche".
     En el HTML: <p class="precio" data-precio="camping"></p> */
  precios: {
    nota: 'Precios de referencia, confirma por WhatsApp',
    camping:      { valor: '$45.000 COP',  unidad: 'por noche' },
    habitaciones: { valor: '$90.000 COP',  unidad: 'por noche' },
    glamping:     { valor: '$400.000 COP', unidad: 'por noche',
                    pendiente: '[por confirmar: aplica al domo, a los globos o a ambos]' }
  },

  /* ---------- Descuento opcional (desactivado) ----------
     Cambiar activo a true para mostrarlo. No inventar el código. */
  descuento: {
    activo: false,
    texto: 'Viajeros solos: 20% de descuento',
    pendiente: '[por confirmar condiciones y código]'
  },

  /* ---------- Datos pendientes (no inventar) ---------- */
  horarioAtencion: '[por confirmar]',

  /* ---------- Enlaces ---------- */
  enlaces: {
    instagram: '#',      // [por confirmar] URL de Instagram
    tiktok: '#',         // [por confirmar] URL de TikTok
    terminos: '#',       // [por confirmar] página de términos y condiciones
    googleMaps: 'https://www.google.com/maps/search/?api=1&query=Casa+Hostal+Amor+Viajero'
  }
};
