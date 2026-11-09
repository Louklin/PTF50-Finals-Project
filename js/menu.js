/*
 * MENU PAGE (no AI here; plain filtering)
 */
(function () {
  const MENU = window.MENU || [];
  const CATS = window.MENU_CATEGORIES || [...new Set(MENU.map(m => m.category))];
  const { esc, peso } = window.SP;

  const filtersEl = document.getElementById("filters");
  const catsEl = document.getElementById("cats");
  const menuEl = document.getElementById("menu-list");
  const active = new Set();

  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const lowest = m => m.prices ? Math.min(...Object.values(m.prices)) : m.price;

  const TESTS = {
    "hot": m => m.temp === "hot" || m.temp === "both",
    "iced": m => m.temp === "iced" || m.temp === "both",
    "no-coffee": m => !(m.tags || []).includes("coffee"),
    "budget": m => lowest(m) <= 150,
    "bestseller": m => (m.tags || []).includes("bestseller")
  };

  function priceHTML(m) {
    if (m.prices) return Object.entries(m.prices).map(([size, p]) => `${esc(size)} ${peso(p)}`).join("<br>");
    return peso(m.price);
  }

  function tagHTML(m) {
    const tags = [];
    if (m.temp === "both") tags.push("Hot / Iced");
    else if (m.temp === "hot") tags.push("Hot");
    else if (m.temp === "iced") tags.push("Iced");
    if ((m.tags || []).includes("bestseller")) tags.push("★ Bestseller");
    return tags.map(t => `<span class="badge tag">${esc(t)}</span>`).join("");
  }

  function render() {
    // Hot and Iced are "either" filters; the rest must all match.
    const temps = ["hot", "iced"].filter(f => active.has(f));
    const others = [...active].filter(f => !temps.includes(f));
    const list = MENU.filter(m =>
      (!temps.length || temps.some(f => TESTS[f](m))) && others.every(f => TESTS[f](m)));
    const cats = CATS.filter(c => list.some(m => m.category === c));

    catsEl.innerHTML = cats.map(c => `<a class="chip" href="#${slug(c)}" style="text-decoration:none">${esc(c)}</a>`).join("");

    if (!list.length) {
      menuEl.innerHTML = `<div class="empty">Nothing on the menu matches all those filters.</div>`;
      return;
    }
    menuEl.innerHTML = cats.map(c => `
      <section class="menu-section" id="${slug(c)}">
        <h2>${esc(c)}</h2>
        ${list.filter(m => m.category === c).map(m => `
          <div class="menu-item">
            <div class="n">${esc(m.name)}</div>
            <div class="p">${priceHTML(m)}</div>
            ${m.desc ? `<div class="d">${esc(m.desc)}</div>` : ""}
            <div class="tags">${tagHTML(m)}</div>
          </div>`).join("")}
      </section>`).join("");
  }

  filtersEl.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const f = chip.dataset.f;
    active.has(f) ? active.delete(f) : active.add(f);
    chip.setAttribute("aria-pressed", String(active.has(f)));
    render();
  });

  render();
})();
