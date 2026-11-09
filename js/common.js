/*
 * Shared code for every page: header, phone tab bar, footer,
 * book covers, the book detail popup, and small helpers.
 * Each page has <body data-page="home|find|books|visit">.
 */
(function () {
  const PAGES = [
    { key: "home",  href: "index.html", label: "Home", short: "Home",
      icon: '<path d="M4 11.5 12 4l8 7.5V20h-5.5v-5.5h-5V20H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' },
    { key: "find",  href: "finder.html", label: "Find a Book", short: "Find",
      icon: '<path d="M11 4a7 7 0 1 0 4.4 12.4l4.1 4.1 1.4-1.4-4.1-4.1A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="currentColor"/><path d="M11 7.5l.9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3z" fill="currentColor"/>' },
    { key: "books", href: "books.html", label: "Books", short: "Books",
      icon: '<path d="M4 4h4v16H4zM10 4h4v16h-4zM15.6 5.2l3.8-1 3.9 15-3.9 1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' },
    // Menu lives on the Home page; this link scrolls down to it.
    { key: "menu",  href: "index.html#menu", label: "Menu", short: "Menu",
      icon: '<path d="M4 9h13v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 3c-1 1.2 1 2 0 3.5M12 3c-1 1.2 1 2 0 3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' },
    { key: "visit", href: "visit.html", label: "Visit", short: "Visit",
      icon: '<path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.3" fill="currentColor"/>' }
  ];

  const current = document.body.dataset.page;
  const S = window.SITE;

  // ---- Header ----
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="wrap">
      <a class="brand" href="index.html">
        <img src="assets/logo.jpg" alt="" width="44" height="44">
        <span>South Peak<small>Book &amp; Garden Cafe</small></span>
      </a>
      <nav class="top-nav" aria-label="Main">
        ${PAGES.map(p => `<a href="${p.href}" ${p.key === current ? 'aria-current="page"' : ""}>${p.label}</a>`).join("")}
      </nav>
    </div>`;
  document.body.prepend(header);

  // ---- Phone tab bar ----
  const tabbar = document.createElement("nav");
  tabbar.className = "tabbar";
  tabbar.setAttribute("aria-label", "Main");
  tabbar.innerHTML = PAGES.map(p => `
    <a href="${p.href}" ${p.key === current ? 'aria-current="page"' : ""}>
      <svg viewBox="0 0 24 24" aria-hidden="true">${p.icon}</svg>${p.short}
    </a>`).join("");
  document.body.append(tabbar);

  // ---- Footer ----
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap">
      <span>${S.name} · ${S.address} · ${S.phone}</span>
      <span>PTF50 student project · AI runs on your device; nothing you type is sent anywhere.</span>
    </div>`;
  document.body.append(footer);

  // ---- Sample data notice ----
  // Books (find/books pages) are a mix of real shelf titles and placeholder
  // titles; menu (real, transcribed from South Peak's printed menu) no
  // longer gets this notice.
  const showSampleNote =
    (current === "find" || current === "books") && S.usingSampleBooks;
  if (showSampleNote) {
    const main = document.querySelector("main .wrap");
    if (main) {
      const note = document.createElement("div");
      note.className = "sample-note";
      note.textContent = "Prototype: some books shown here are still placeholders, not yet confirmed against South Peak's actual shelves.";
      main.prepend(note);
    }
  }

  // ---------------------------------------------------------------------------
  // Helpers (exposed on window.SP so page scripts can use them)
  // ---------------------------------------------------------------------------
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function peso(n) {
    return "₱" + Number(n).toLocaleString("en-PH");
  }

  // Pick dark or light text depending on how bright the cover color is.
  function textColorFor(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
    if (!m) return "#fff";
    const v = parseInt(m[1], 16);
    const r = (v >> 16) & 255, g = (v >> 8) & 255, b = v & 255;
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.62 ? "#3d2418" : "#fffaf0";
  }

  function coverHTML(book) {
    const bg = book.color || "#7a3f24";
    // data-id lets covers.js find this tile later and try to upgrade it to a real cover photo.
    return `<div class="cover" data-id="${esc(book.id)}" style="background:${esc(bg)};color:${textColorFor(bg)}" aria-hidden="true">
      <div class="c-title">${esc(book.title)}</div>
      <div class="c-author">${esc(book.author)}</div>
    </div>`;
  }

  function availabilityBadges(book) {
    const out = [];
    if (book.available === "read" || book.available === "both") out.push('<span class="badge read">Read in café</span>');
    if ((book.available === "sale" || book.available === "both") && book.price != null) out.push(`<span class="badge sale">For sale · ${peso(book.price)}</span>`);
    return out.join("");
  }

  // ---- Book detail popup (shared by Finder and Catalog) ----
  let dialog;
  function openBook(book) {
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "book-dialog";
      document.body.append(dialog);
      dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
    }
    const buy = (book.available === "sale" || book.available === "both")
      ? `<p class="small muted">Buy it at the counter, or order online from the <a href="${esc(S.shopee)}" target="_blank" rel="noopener">South Peak Shopee shop</a>.</p>`
      : `<p class="small muted">This copy stays in the café. Ask the staff and enjoy it with a drink.</p>`;
    dialog.innerHTML = `
      <button class="dlg-close" aria-label="Close">×</button>
      <div class="dlg-body">
        ${coverHTML(book)}
        <div class="info">
          <h2>${esc(book.title)}</h2>
          <p class="muted">${esc(book.author)}${book.pages ? ` · about ${book.pages} pages` : ""}</p>
          <div class="chips" style="gap:6px;margin-bottom:12px">${availabilityBadges(book)}</div>
          <p>${esc(book.blurb)}</p>
          <div class="chips" style="gap:6px;margin-bottom:12px">
            ${(book.genres || []).map(g => `<span class="badge tag">${esc(g)}</span>`).join("")}
          </div>
          ${buy}
        </div>
      </div>`;
    dialog.querySelector(".dlg-close").addEventListener("click", () => dialog.close());
    dialog.showModal();
    window.SP.enhanceCovers && window.SP.enhanceCovers(dialog);
  }

  window.SP = { esc, peso, coverHTML, availabilityBadges, openBook };
})();
