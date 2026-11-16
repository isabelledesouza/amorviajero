/* =========================================================
   main.js — Casa Hostal Amor Viajero
   1. Header, footer y botón flotante (iguales en todas las páginas)
   2. Divisores de cuerda trenzada
   3. Datos de config.js en la página (textos, enlaces, líneas)
   4. Enlaces de WhatsApp con mensaje prellenado
   5. Menú móvil
   ========================================================= */
(function () {
  'use strict';

  var C = window.AMOR_VIAJERO;
  var html = document.documentElement;
  var ROOT = html.dataset.root || '';            // "" en la Home, "../" en páginas internas
  var PAGE = html.dataset.page || 'index.html';  // página actual (marca el menú)

  /* ---------- Menú principal ---------- */
  var NAV = [
    { titulo: 'Alojamiento', href: 'alojamiento/index.html', sub: [
      ['Glamping domo', 'alojamiento/glamping-domo.html'],
      ['Glamping globos', 'alojamiento/glamping-globos.html'],
      ['Habitaciones', 'alojamiento/habitaciones.html'],
      ['Camping y casas rodantes', 'alojamiento/camping.html']
    ]},
    { titulo: 'Experiencias', href: 'experiencias/index.html', sub: [
      ['Pasadía', 'experiencias/pasadia.html'],
      ['Río', 'experiencias/rio.html'],
      ['Cuatrimotos', 'experiencias/cuatrimotos.html'],
      ['Restaurante', 'experiencias/restaurante.html']
    ]},
    { titulo: 'Eventos', href: 'eventos/index.html', sub: [
      ['Agenda', 'eventos/agenda.html'],
      ['Archivo', 'eventos/archivo.html']
    ]},
    { titulo: 'Contacto', href: 'contacto/index.html', sub: [
      ['WhatsApp', 'contacto/whatsapp.html'],
      ['Cómo llegar', 'contacto/como-llegar.html'],
      ['Preguntas frecuentes', 'contacto/preguntas-frecuentes.html']
    ]}
  ];

  // Ícono de WhatsApp (línea)
  var ICONO_WA =
    '<svg class="icono-wa" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M8.6 7.4c.3-.4.9-.4 1.2 0l.9 1.7c.2.4.1.8-.2 1.1l-.4.4a6.2 6.2 0 0 0 2.9 2.9l.4-.4c.3-.3.7-.4 1.1-.2l1.7.9c.4.3.4.9 0 1.2-.8.8-2 1-3 .6a9 9 0 0 1-5-5c-.4-1-.2-2.2.4-3.2z" fill="currentColor"/></svg>';

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }
  // "glampingDomo" → texto de config.js; si no es una clave, se usa el texto tal cual
  function mensaje(clave) { return C.mensajes[clave] || clave || C.mensajes.general; }
  function waUrl(clave, linea) {
    var lineas = C.whatsapp.lineas;
    var i = (typeof linea === 'number' && lineas[linea]) ? linea : C.whatsapp.principal;
    return 'https://wa.me/' + lineas[i].numero + '?text=' + encodeURIComponent(mensaje(clave));
  }
  function actual(href) { return href === PAGE ? ' aria-current="page"' : ''; }

  /* ---------- 1. Header ---------- */
  function header() {
    var items = NAV.map(function (item) {
      var activo = PAGE.indexOf(item.href.split('/')[0] + '/') === 0 ? ' is-activo' : '';
      var sub = item.sub.map(function (s) {
        return '<li><a href="' + ROOT + s[1] + '"' + actual(s[1]) + '>' + s[0] + '</a></li>';
      }).join('');
      return '<li class="nav__item' + activo + '">' +
        '<a class="nav__link" href="' + ROOT + item.href + '"' + actual(item.href) + '>' + item.titulo + '</a>' +
        '<ul class="nav__sub">' + sub + '</ul></li>';
    }).join('');

    return '<header class="header">' +
      '<div class="header__barra contenedor">' +
        '<a class="header__logo" href="' + ROOT + 'index.html">' +
          '<img src="' + ROOT + 'images/logo-sello-claro.svg" alt="" width="52" height="52">' +
          '<span class="header__nombre">Casa Hostal<br>Amor Viajero</span>' +
        '</a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-principal">' +
          '<span class="nav-toggle__icono" aria-hidden="true"></span>' +
          '<span class="visually-hidden">Abrir menú</span>' +
        '</button>' +
        '<nav class="nav" id="menu-principal" aria-label="Principal"><ul class="nav__lista">' + items + '</ul></nav>' +
      '</div></header>';
  }

  /* ---------- Footer ---------- */
  function footer() {
    return '<footer class="footer">' +
      '<div class="divisor divisor--oscuro" aria-hidden="true"></div>' +
      '<div class="contenedor footer__grid">' +
        '<div><img class="footer__logo" src="' + ROOT + 'images/logo-sello-claro.svg" alt="Sello de Casa Hostal Amor Viajero: ancla, #AmorViajero, desde 2016" width="120" height="120" loading="lazy"></div>' +
        '<div><h2 class="footer__titulo">Ubicación</h2>' +
          '<address>' + esc(C.ubicacion) + '</address>' +
          '<p><span class="por-confirmar">' + esc(C.ubicacionPendiente) + '</span></p>' +
          '<p><a href="' + ROOT + 'contacto/como-llegar.html">Cómo llegar</a></p></div>' +
        '<div><h2 class="footer__titulo">WhatsApp</h2>' +
          '<ul class="footer__lista" data-wa-lineas></ul>' +
          '<p class="footer__nota">Horario de atención: <span class="por-confirmar" data-cfg="horarioAtencion"></span></p></div>' +
        '<div><h2 class="footer__titulo">Síguenos</h2>' +
          '<ul class="footer__lista">' +
            '<li><a href="#" data-cfg-href="instagram">Instagram</a></li>' +
            '<li><a href="#" data-cfg-href="tiktok">TikTok</a></li>' +
          '</ul></div>' +
      '</div>' +
      '<p class="footer__legal contenedor">© <span data-anio></span> Casa Hostal Amor Viajero · #AmorViajero · Desde 2016</p>' +
      '</footer>';
  }

  /* ---------- Botón flotante (mensaje según la página: data-wa-msg en <html>) ---------- */
  function flotante() {
    return '<a class="wa-flotante" href="' + ROOT + 'contacto/whatsapp.html" data-wa="' + esc(html.dataset.waMsg || 'general') + '">' +
      ICONO_WA + '<span class="visually-hidden">Escríbenos por WhatsApp</span></a>';
  }

  document.querySelectorAll('[data-include]').forEach(function (el) {
    var tipo = el.getAttribute('data-include');
    if (tipo === 'header') el.outerHTML = header();
    if (tipo === 'footer') el.outerHTML = footer();
  });
  document.body.insertAdjacentHTML('beforeend', flotante());

  /* ---------- 2. Divisores de cuerda trenzada ----------
     Tramo de 48×20 (images/divisor-cuerda.svg) repetido a lo ancho.
     .divisor = fondo claro (contorno negro, relleno piedra)
     .divisor--oscuro = fondo oscuro (contorno blanco, relleno negro) */
  var HEBRA_A = 'M0 16C12 16 12 4 24 4S36 16 48 16';
  var HEBRA_B = 'M0 4C12 4 12 16 24 16S36 4 48 4';
  function hebra(d) {
    return '<path class="cuerda__borde" d="' + d + '"/><path class="cuerda__relleno" d="' + d + '"/>';
  }
  function patron(id) {
    return '<pattern id="' + id + '" class="' + id + '" width="48" height="20" patternUnits="userSpaceOnUse"><g fill="none">' +
      hebra(HEBRA_A) + hebra(HEBRA_B) +
      '<g clip-path="url(#cuerda-mitad)">' + hebra(HEBRA_A) + '</g>' +   // cruce: la hebra A pasa por encima
      '</g></pattern>';
  }
  if (document.querySelector('.divisor')) {
    document.body.insertAdjacentHTML('afterbegin',
      '<svg class="sprite" aria-hidden="true" focusable="false"><defs>' +
      '<clipPath id="cuerda-mitad"><rect x="24" width="24" height="20"/></clipPath>' +
      patron('cuerda-clara') + patron('cuerda-oscura') + '</defs></svg>');
    document.querySelectorAll('.divisor').forEach(function (d) {
      var id = d.classList.contains('divisor--oscuro') ? 'cuerda-oscura' : 'cuerda-clara';
      d.innerHTML = '<svg aria-hidden="true" focusable="false"><rect width="100%" height="20" fill="url(#' + id + ')"/></svg>';
    });
  }

  /* ---------- 3. Datos de config.js ---------- */
  document.querySelectorAll('[data-wa-lineas]').forEach(function (ul) {
    ul.innerHTML = C.whatsapp.lineas.map(function (l, i) {
      return '<li><a href="#" data-wa="general" data-wa-linea="' + i + '">' + l.visible + '</a></li>';
    }).join('');
  });
  document.querySelectorAll('[data-cfg]').forEach(function (el) {          // textos
    var v = C[el.getAttribute('data-cfg')];
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-cfg-href]').forEach(function (a) {     // enlaces
    var url = C.enlaces[a.getAttribute('data-cfg-href')];
    if (url) a.href = url;
    if (url && url !== '#') { a.target = '_blank'; a.rel = 'noopener'; }
  });
  // Precios: <p class="precio" data-precio="camping"></p> → "Desde $45.000 COP por noche"
  document.querySelectorAll('[data-precio]').forEach(function (el) {
    var p = C.precios[el.getAttribute('data-precio')];
    if (!p) { el.remove(); return; }
    el.innerHTML = '<span class="precio__desde">Desde</span> <strong>' + esc(p.valor) + '</strong> ' + esc(p.unidad) +
      (p.pendiente ? ' <span class="por-confirmar">' + esc(p.pendiente) + '</span>' : '');
  });
  document.querySelectorAll('[data-precios-nota]').forEach(function (el) { el.textContent = C.precios.nota; });

  // Descuento opcional (solo si está activo en config.js)
  document.querySelectorAll('[data-descuento]').forEach(function (el) {
    if (!C.descuento.activo) { el.remove(); return; }
    el.innerHTML = '<strong>' + esc(C.descuento.texto) + '</strong> <span class="por-confirmar">' + esc(C.descuento.pendiente) + '</span>';
  });

  document.querySelectorAll('[data-anio]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- 4. Enlaces de WhatsApp ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var linea = a.hasAttribute('data-wa-linea') ? Number(a.getAttribute('data-wa-linea')) : undefined;
    a.href = waUrl(a.getAttribute('data-wa'), linea);
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('.btn--whatsapp').forEach(function (b) {
    if (!b.querySelector('svg')) b.insertAdjacentHTML('afterbegin', ICONO_WA);
  });

  /* ---------- 5. Menú móvil ---------- */
  var head = document.querySelector('.header');
  var toggle = document.querySelector('.nav-toggle');
  if (head && toggle) {
    var setMenu = function (abierto) {
      toggle.setAttribute('aria-expanded', String(abierto));
      head.classList.toggle('is-open', abierto);
      toggle.querySelector('.visually-hidden').textContent = abierto ? 'Cerrar menú' : 'Abrir menú';
    };
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && head.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    });
    // Cerrar al elegir un enlace (útil para anclas de la Home)
    head.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    window.matchMedia('(min-width: 60em)').addEventListener('change', function () { setMenu(false); });
  }
})();
