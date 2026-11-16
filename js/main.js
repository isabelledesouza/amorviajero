/* =========================================================
   main.js — Casa Hostal Amor Viajero
   1. Pinta header, footer y botón flotante (una sola fuente para todas las páginas)
   2. Convierte cada [data-wa="mensaje"] en enlace wa.me con el mensaje prellenado
   3. Menú móvil, formulario "arma tu mensaje" y datos de config.js
   ========================================================= */
(function () {
  'use strict';

  var C = window.AMOR_VIAJERO;
  var html = document.documentElement;
  var ROOT = html.dataset.root || '';            // "" en la Home, "../" en páginas internas
  var PAGE = html.dataset.page || 'index.html';  // página actual, para marcar el menú

  /* ---------- Menú principal (editar aquí para agregar/quitar páginas) ---------- */
  var NAV = [
    { titulo: 'Alojamiento', href: 'alojamiento/index.html', sub: [
      ['Glamping', 'alojamiento/glamping.html'],
      ['Habitaciones', 'alojamiento/habitaciones.html'],
      ['Cabañas', 'alojamiento/cabanas.html'],
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

  var ICONO_WA =
    '<svg class="icono-wa" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<path d="M8.6 7.4c.3-.4.9-.4 1.2 0l.9 1.7c.2.4.1.8-.2 1.1l-.4.4a6.2 6.2 0 0 0 2.9 2.9l.4-.4c.3-.3.7-.4 1.1-.2l1.7.9c.4.3.4.9 0 1.2-.8.8-2 1-3 .6a9 9 0 0 1-5-5c-.4-1-.2-2.2.4-3.2z" fill="currentColor"/></svg>';

  /* ---------- Utilidades ---------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  // Arma el enlace de WhatsApp. "linea" es opcional (índice en config.js).
  function waUrl(mensaje, linea) {
    var lineas = C.whatsapp.lineas;
    var i = (typeof linea === 'number' && lineas[linea]) ? linea : C.whatsapp.principal;
    return 'https://wa.me/' + lineas[i].numero + '?text=' + encodeURIComponent(mensaje);
  }

  function actual(href) { return href === PAGE ? ' aria-current="page"' : ''; }

  /* ---------- 1. Header ---------- */
  function header() {
    var items = NAV.map(function (item) {
      var seccion = item.href.split('/')[0] + '/';
      var activo = PAGE.indexOf(seccion) === 0 ? ' is-activo' : '';
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
        '<nav class="nav" id="menu-principal" aria-label="Principal">' +
          '<ul class="nav__lista">' + items + '</ul>' +
        '</nav>' +
      '</div></header>';
  }

  /* ---------- Footer ---------- */
  function red(nombre, url) {
    var externo = url && url !== '#' ? ' target="_blank" rel="noopener"' : '';
    return '<li><a href="' + esc(url || '#') + '"' + externo + '>' + nombre + '</a></li>';
  }

  function footer() {
    return '<footer class="footer">' +
      '<div class="divisor divisor--footer" aria-hidden="true"></div>' +
      '<div class="contenedor footer__grid">' +
        '<div class="footer__marca">' +
          '<img src="' + ROOT + 'images/logo-sello-claro.svg" alt="Sello de Casa Hostal Amor Viajero: ancla, #AmorViajero, desde 2016" width="120" height="120" loading="lazy">' +
        '</div>' +
        '<div><h2 class="footer__titulo">Ubicación</h2>' +
          '<address>Río Cañas<br>San Francisco, Cundinamarca<br>Colombia</address>' +
          '<p><a href="' + ROOT + 'contacto/como-llegar.html">Cómo llegar</a></p></div>' +
        '<div><h2 class="footer__titulo">WhatsApp</h2>' +
          '<ul class="footer__lista" data-wa-lineas></ul>' +
          '<p class="footer__nota">Horario de atención: <span data-cfg="horarioAtencion"></span></p></div>' +
        '<div><h2 class="footer__titulo">Síguenos</h2>' +
          '<ul class="footer__lista">' + red('Instagram', C.redes.instagram) + red('TikTok', C.redes.tiktok) + '</ul></div>' +
      '</div>' +
      '<p class="footer__legal contenedor">© <span data-anio></span> Casa Hostal Amor Viajero · #AmorViajero · Desde 2016</p>' +
      '</footer>';
  }

  /* ---------- Botón flotante (mensaje según la página) ---------- */
  function flotante() {
    var msg = html.dataset.waMsg || C.mensajePorDefecto;
    return '<a class="wa-flotante" href="' + ROOT + 'contacto/whatsapp.html" data-wa="' + esc(msg) + '">' +
      ICONO_WA + '<span class="visually-hidden">Escríbenos por WhatsApp</span></a>';
  }

  /* ---------- Insertar piezas globales ---------- */
  document.querySelectorAll('[data-include]').forEach(function (el) {
    var tipo = el.getAttribute('data-include');
    if (tipo === 'header') el.outerHTML = header();
    if (tipo === 'footer') el.outerHTML = footer();
  });
  document.body.insertAdjacentHTML('beforeend', flotante());

  /* ---------- Divisor de cuerda trenzada ----------
     El tramo (48×20, igual a images/divisor-cuerda.svg) se define una sola vez como
     <pattern>; cada <div class="divisor"> lo repite a lo ancho (equivale a repeat-x).
     Colores: variables --cuerda-borde y --cuerda-relleno en styles.css. */
  var HEBRA_A = 'M0 16C12 16 12 4 24 4S36 16 48 16';
  var HEBRA_B = 'M0 4C12 4 12 16 24 16S36 4 48 4';
  var hebra = function (d) {
    return '<path class="cuerda__borde" d="' + d + '"/><path class="cuerda__relleno" d="' + d + '"/>';
  };
  if (document.querySelector('.divisor')) {
    document.body.insertAdjacentHTML('afterbegin',
      '<svg class="sprite" aria-hidden="true" focusable="false"><defs>' +
        '<clipPath id="cuerda-mitad"><rect x="24" width="24" height="20"/></clipPath>' +
        '<pattern id="cuerda" width="48" height="20" patternUnits="userSpaceOnUse"><g fill="none">' +
          hebra(HEBRA_A) + hebra(HEBRA_B) +
          '<g clip-path="url(#cuerda-mitad)">' + hebra(HEBRA_A) + '</g>' +   // cruce: hebra A pasa por encima
        '</g></pattern></defs></svg>');
    document.querySelectorAll('.divisor').forEach(function (d) {
      d.innerHTML = '<svg aria-hidden="true" focusable="false"><rect width="100%" height="20" fill="url(#cuerda)"/></svg>';
    });
  }

  // Listas con las 3 líneas de WhatsApp
  document.querySelectorAll('[data-wa-lineas]').forEach(function (ul) {
    ul.innerHTML = C.whatsapp.lineas.map(function (l, i) {
      return '<li><a href="#" data-wa="' + esc(C.mensajePorDefecto) + '" data-wa-linea="' + i + '">' + l.visible + '</a></li>';
    }).join('');
  });

  // Textos editables desde config.js: <span data-cfg="horarioAtencion"></span>
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    var v = C[el.getAttribute('data-cfg')];
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-anio]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 2. Enlaces de WhatsApp ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var linea = a.hasAttribute('data-wa-linea') ? Number(a.getAttribute('data-wa-linea')) : undefined;
    a.href = waUrl(a.getAttribute('data-wa'), linea);
    a.target = '_blank';
    a.rel = 'noopener';
  });
  // Ícono en los botones verdes
  document.querySelectorAll('.btn--whatsapp').forEach(function (b) {
    if (!b.querySelector('svg')) b.insertAdjacentHTML('afterbegin', ICONO_WA);
  });

  /* ---------- 3a. Menú móvil ---------- */
  var head = document.querySelector('.header');
  var toggle = document.querySelector('.nav-toggle');
  if (head && toggle) {
    var setMenu = function (abierto) {
      toggle.setAttribute('aria-expanded', String(abierto));
      head.classList.toggle('is-open', abierto);
      toggle.querySelector('.visually-hidden').textContent = abierto ? 'Cerrar menú' : 'Abrir menú';
    };
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && head.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 60em)').addEventListener('change', function () { setMenu(false); });
  }

  /* ---------- 3b. Formulario "arma tu mensaje" ---------- */
  var form = document.querySelector('[data-wa-form]');
  if (form) {
    var vista = form.querySelector('[data-wa-preview]');
    var armar = function () {
      var d = new FormData(form);
      var msg = 'Hola, quiero ' + d.get('interes');
      var fecha = d.get('fecha');
      if (fecha) {
        var p = fecha.split('-');          // aaaa-mm-dd → dd/mm/aaaa
        msg += ' para el ' + p[2] + '/' + p[1] + '/' + p[0];
      }
      var n = d.get('personas');
      if (n) msg += ', somos ' + n + (n === '1' ? ' persona' : ' personas');
      return msg + '.';
    };
    var actualizar = function () { if (vista) vista.textContent = armar(); };
    form.addEventListener('input', actualizar);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      window.open(waUrl(armar()), '_blank', 'noopener');
    });
    actualizar();
  }
})();
