/* ==========================================================
   Lógica do site. Normalmente você NÃO precisa editar este arquivo:
   contatos ficam em js/config.js e projetos em js/projects.js.
   ========================================================== */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var PROJECTS = (window.PROJECTS || []).filter(function (p) { return p && !p.hidden; });

  var STATUS = {
    "no-ar": "No ar",
    "mvp": "MVP",
    "prototipo": "Protótipo",
    "demo": "Demonstração"
  };
  var KIND = { site: "Site", sistema: "Sistema" };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };

  /* Cria elementos sem usar innerHTML (texto sempre entra como texto). */
  function el(tag, props) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      var v = props[k];
      if (v === undefined || v === null || v === false) return;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k.indexOf("on") === 0 && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var kids = [].concat(arguments[i]);
      for (var j = 0; j < kids.length; j++) {
        var kid = kids[j];
        if (kid !== null && kid !== undefined && kid !== false) node.append(kid);
      }
    }
    return node;
  }

  function host(url) { return String(url).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""); }

  function whatsappUrl() {
    var n = String(SITE.whatsapp || "").replace(/\D/g, "");
    if (!n) return null;
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(SITE.whatsappMessage || "");
  }

  function coverOf(p) {
    if (p.cover) return p.cover;
    var img = (p.media || []).filter(function (m) { return m.type === "image" && m.src; })[0];
    return img ? img.src : null;
  }

  function pill(status) {
    var key = STATUS[status] ? status : "demo";
    return el("span", { class: "pill", "data-status": key }, el("i", { "aria-hidden": "true" }), STATUS[key]);
  }

  /* ---------- Cabeçalho, hero e contato ---------- */

  function setupContact() {
    var wa = whatsappUrl();
    ["nav-whatsapp", "cta-whatsapp"].forEach(function (id) {
      var a = document.getElementById(id);
      if (a && wa) { a.href = wa; a.target = "_blank"; a.rel = "noopener"; a.hidden = false; }
    });

    var items = [];
    if (wa) items.push({ label: "WhatsApp", value: "Abrir conversa", href: wa });
    if (SITE.email) items.push({ label: "E-mail", value: SITE.email, href: "mailto:" + SITE.email });
    if (SITE.github) items.push({ label: "GitHub", value: host(SITE.github), href: SITE.github });
    if (SITE.linkedin) items.push({ label: "LinkedIn", value: host(SITE.linkedin), href: SITE.linkedin });
    if (SITE.instagram) items.push({ label: "Instagram", value: host(SITE.instagram), href: SITE.instagram });

    var list = $("#contacts");
    if (!items.length) {
      list.hidden = true;
      console.warn("[portfólio] Nenhum contato configurado. Preencha js/config.js.");
      return;
    }
    items.forEach(function (c) {
      var external = /^https?:/.test(c.href);
      list.append(el("li", null,
        el("a", { class: "row", href: c.href, target: external ? "_blank" : null, rel: external ? "noopener" : null },
          el("span", { class: "row__main" }, el("span", { class: "row__title", text: c.label })),
          el("span", { class: "row__meta", text: c.value })
        )
      ));
    });
  }

  function setupLive() {
    var live = PROJECTS.filter(function (p) { return p.status === "no-ar" && p.url; });
    if (!live.length) return;
    var box = $("#live-links");
    live.forEach(function (p) {
      box.append(el("a", { href: p.url, target: "_blank", rel: "noopener", text: host(p.url) }));
    });
    $("#live").hidden = false;
  }

  function setupAbout() {
    var stack = $("#stack");
    (SITE.stack || []).forEach(function (s) { stack.append(el("li", { text: s })); });
    if (SITE.showSecurityInAbout === false) {
      var sec = $("#about-security");
      if (sec) sec.remove();
    }
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- Lista de projetos ---------- */

  function renderRows(filter) {
    var list = $("#rows");
    list.replaceChildren();
    var items = PROJECTS.filter(function (p) { return filter === "todos" || p.kind === filter; });

    if (!items.length) {
      list.append(el("li", { class: "rows__empty", text: "Nenhum projeto nesta categoria ainda." }));
      return;
    }

    items.forEach(function (p) {
      var cover = coverOf(p);
      var thumb = cover
        ? el("span", { class: "row__thumb" }, el("img", {
            src: cover, alt: "", loading: "lazy",
            onerror: function (e) { e.target.parentNode.remove(); }
          }))
        : null;

      var btn = el("button", {
          class: "row", type: "button", "aria-haspopup": "dialog",
          onclick: function (e) { openProject(p, e.currentTarget); }
        },
        el("span", { class: "row__main" },
          el("span", { class: "row__title", text: p.title }),
          el("span", { class: "row__tagline", text: p.tagline || "" })
        ),
        el("span", { class: "row__aside" },
          thumb,
          el("span", { class: "row__meta" },
            el("span", { text: KIND[p.kind] || "" }),
            pill(p.status)
          )
        )
      );
      list.append(el("li", null, btn));
    });
  }

  function setupFilters() {
    var box = $("#filters");
    var kinds = {};
    PROJECTS.forEach(function (p) { kinds[p.kind] = true; });
    if (Object.keys(kinds).length < 2) { box.hidden = true; }

    box.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (!b) return;
      box.querySelectorAll("button").forEach(function (x) {
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      renderRows(b.getAttribute("data-filter"));
    });
    renderRows("todos");
  }

  /* ---------- Modal ---------- */

  var dlg = $("#project-dialog");
  var lastTrigger = null;
  var gallery = null;

  function openProject(p, trigger) {
    lastTrigger = trigger;
    renderDialog(p);
    document.documentElement.classList.add("modal-open");
    dlg.showModal();
  }

  dlg.addEventListener("close", function () {
    $("#dialog-body").replaceChildren(); // para vídeos e iframes
    gallery = null;
    document.documentElement.classList.remove("modal-open");
    if (lastTrigger) lastTrigger.focus();
  });

  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  dlg.addEventListener("keydown", function (e) {
    if (!gallery) return;
    var t = e.target.tagName;
    if (t === "VIDEO" || t === "IFRAME") return;
    if (e.key === "ArrowRight") { gallery.step(1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { gallery.step(-1); e.preventDefault(); }
  });

  function textBlock(title, items, cls) {
    if (!items || !items.length) return null;
    return [
      el("h3", { class: "sub", text: title }),
      el("ul", { class: cls }, items.map(function (t) { return el("li", { text: t }); }))
    ];
  }

  function renderDialog(p) {
    var body = $("#dialog-body");
    body.replaceChildren();

    var media = (p.media || []).filter(function (m) { return m && m.type; });
    dlg.classList.toggle("modal--narrow", media.length === 0);

    var paragraphs = [].concat(p.description || []).map(function (t) { return el("p", { text: t }); });

    var links = [];
    if (p.url) links.push(el("a", { class: "btn btn--solid", href: p.url, target: "_blank", rel: "noopener", text: "Abrir site" }));
    (p.links || []).forEach(function (l) {
      links.push(el("a", { class: "btn btn--line", href: l.url, target: "_blank", rel: "noopener", text: l.label }));
    });

    var info = el("div", { class: "modal__info" },
      el("h2", { class: "modal__title", id: "dialog-title", text: p.title }),
      el("div", { class: "meta" }, pill(p.status), el("span", { text: KIND[p.kind] || "" })),
      paragraphs,
      textBlock("Destaques", p.features, "bullets"),
      textBlock("Feito com", p.tech, "tags"),
      links.length ? el("div", { class: "modal__links" }, links) : null
    );

    body.append(
      el("button", { class: "modal__close", type: "button", "aria-label": "Fechar projeto", onclick: function () { dlg.close(); }, text: "Fechar" }),
      el("div", { class: "modal__panel" }, media.length ? buildGallery(p, media) : null, info)
    );
    var close = $(".modal__close", body);
    if (close) close.focus();
  }

  var CHEVRON_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M15 4l-8 8 8 8"/></svg>';
  var CHEVRON_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M9 4l8 8-8 8"/></svg>';

  function mediaNode(m, p) {
    if (m.type === "video") {
      return el("video", { src: m.src, poster: m.poster, controls: true, playsinline: true, preload: "metadata" });
    }
    if (m.type === "youtube") {
      return el("iframe", {
        src: "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(m.id) + "?rel=0",
        title: m.caption || "Vídeo do projeto " + p.title,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: true, loading: "lazy", referrerpolicy: "strict-origin-when-cross-origin"
      });
    }
    return el("img", {
      src: m.src,
      alt: m.alt || m.caption || "Imagem do projeto " + p.title,
      onerror: function (e) {
        console.warn("[portfólio] Arquivo não encontrado:", m.src);
        e.target.replaceWith(el("p", { class: "stage__error", text: "Não foi possível carregar esta imagem." }));
      }
    });
  }

  function thumbNode(m) {
    var src = m.type === "youtube" ? "https://i.ytimg.com/vi/" + encodeURIComponent(m.id) + "/mqdefault.jpg"
      : m.type === "video" ? m.poster
      : m.src;
    return [
      src ? el("img", { src: src, alt: "", loading: "lazy" }) : null,
      m.type === "image" ? null : el("span", { class: "thumb__play", "aria-hidden": "true" })
    ];
  }

  function buildGallery(p, media) {
    var stage = el("div", { class: "stage" });
    var caption = el("p", { class: "caption", "aria-live": "polite" });
    var idx = 0;

    var prev = el("button", { class: "stage__nav stage__nav--prev", type: "button", "aria-label": "Anterior", onclick: function () { step(-1); } });
    var next = el("button", { class: "stage__nav stage__nav--next", type: "button", "aria-label": "Próxima", onclick: function () { step(1); } });
    prev.innerHTML = CHEVRON_L; // SVG fixo, sem dados de fora
    next.innerHTML = CHEVRON_R;

    var thumbs = media.map(function (m, i) {
      return el("button", {
        class: "thumb", type: "button",
        "aria-label": "Mostrar " + (m.type === "image" ? "foto " : "vídeo ") + (i + 1),
        onclick: function () { show(i); }
      }, thumbNode(m));
    });

    function show(i) {
      idx = (i + media.length) % media.length;
      var m = media[idx];
      stage.replaceChildren(mediaNode(m, p));
      if (media.length > 1) stage.append(prev, next);
      caption.textContent = m.caption || "";
      thumbs.forEach(function (b, j) { b.setAttribute("aria-current", j === idx ? "true" : "false"); });
    }
    function step(d) { show(idx + d); }

    gallery = { step: step };
    show(0);

    return el("div", { class: "modal__media" },
      stage,
      caption,
      media.length > 1 ? el("div", { class: "thumbs" }, thumbs) : null
    );
  }

  /* ---------- Início ---------- */

  setupContact();
  setupLive();
  setupAbout();
  setupFilters();
})();
