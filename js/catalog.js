/*
 * BOOK CATALOG PAGE (no AI here; plain filtering and sorting)
 */
(function () {
  const BOOKS = window.BOOKS || [];
  const { esc, coverHTML, availabilityBadges, openBook } = window.SP;

  const qEl = document.getElementById("q");
  const genreEl = document.getElementById("genre");
  const sortEl = document.getElementById("sort");
  const availEl = document.getElementById("avail");
  const grid = document.getElementById("grid");
  const countEl = document.getElementById("count");

  let avail = "";

  // Fill the genre dropdown from the data.
  const genres = [...new Set(BOOKS.flatMap(b => b.genres || []))].sort();
  genreEl.insertAdjacentHTML("beforeend", genres.map(g => `<option>${esc(g)}</option>`).join(""));

  // Allow links like books.html?genre=Filipino
  const params = new URLSearchParams(location.search);
  if (params.get("genre")) genreEl.value = params.get("genre");

  const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const canRead = b => b.available === "read" || b.available === "both";
  const canBuy = b => (b.available === "sale" || b.available === "both") && b.price != null;

  function render() {
    const q = norm(qEl.value.trim());
    const g = genreEl.value;
    let list = BOOKS.filter(b =>
      (!q || norm(b.title + " " + b.author).includes(q)) &&
      (!g || (b.genres || []).includes(g)) &&
      (!avail || (avail === "read" ? canRead(b) : canBuy(b)))
    );

    const byPrice = dir => (a, b) => {
      // Books that aren't for sale go last.
      const pa = a.price ?? (dir > 0 ? Infinity : -Infinity);
      const pb = b.price ?? (dir > 0 ? Infinity : -Infinity);
      return dir * (pa - pb) || a.title.localeCompare(b.title);
    };
    const sorters = {
      "title": (a, b) => a.title.localeCompare(b.title),
      "author": (a, b) => a.author.localeCompare(b.author),
      "price-asc": byPrice(1),
      "price-desc": byPrice(-1)
    };
    list.sort(sorters[sortEl.value]);

    countEl.textContent = `${list.length} of ${BOOKS.length} books`;
    if (!list.length) {
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1">No books match. Try clearing the search or picking "All".</div>`;
      return;
    }
    grid.innerHTML = list.map(b => `
      <button type="button" class="book-tile" data-id="${esc(b.id)}">
        ${coverHTML(b)}
        <div class="meta">
          <div class="t">${esc(b.title)}</div>
          <div class="a">${esc(b.author)}</div>
          <div class="b">${availabilityBadges(b)}</div>
        </div>
      </button>`).join("");
    window.SP.enhanceCovers && window.SP.enhanceCovers(grid);
  }

  grid.addEventListener("click", e => {
    const tile = e.target.closest(".book-tile");
    if (tile) openBook(BOOKS.find(b => b.id === tile.dataset.id));
  });

  availEl.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    avail = chip.dataset.v;
    availEl.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
    render();
  });

  qEl.addEventListener("input", render);
  genreEl.addEventListener("change", render);
  sortEl.addEventListener("change", render);

  render();
})();
