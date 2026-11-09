/*
 * REAL BOOK COVERS (optional, progressive enhancement)
 * ---------------------------------------------------------------------------
 * We don't download or store cover art ourselves — that would mean
 * redistributing copyrighted publisher artwork, which this project doesn't
 * have a license to do. Instead, each visitor's own browser asks the Open
 * Library Covers API (openlibrary.org, run by the Internet Archive, free,
 * no API key) for a cover image at the moment they view a book. If a match
 * is found, it's shown on top of the generated color cover; if not, the
 * generated cover stays as-is. Nothing is cached or copied by this site —
 * only the book's search result (a small image URL) is remembered in the
 * visitor's own browser so repeat visits don't re-query every time.
 *
 * Usage: after inserting any HTML built with SP.coverHTML(book), call
 *   SP.enhanceCovers(containerElement)
 * and it will find every cover inside that container and try to upgrade it.
 */
(function () {
  const CACHE_KEY = "sp-covers-v1";
  const CACHE_DAYS = 60; // how long we trust a "no cover found" result before trying again

  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { cache = {}; }
  function persist() {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch { /* storage full/blocked: fine */ }
  }

  function cached(id) {
    const hit = cache[id];
    if (!hit) return undefined;
    if (hit.url === null && Date.now() - hit.t > CACHE_DAYS * 86400000) return undefined; // retry stale misses
    return hit;
  }

  // Small concurrency limiter so we don't fire 90+ requests at once.
  let active = 0;
  const queue = [];
  const LIMIT = 4;
  function runQueued() {
    while (active < LIMIT && queue.length) {
      const job = queue.shift();
      active++;
      job().finally(() => { active--; runQueued(); });
    }
  }
  function enqueue(fn) {
    return new Promise((resolve) => {
      queue.push(() => fn().then(resolve, () => resolve(null)));
      runQueued();
    });
  }

  async function lookup(book) {
    const q = `${book.title} ${book.author}`;
    const url = "https://openlibrary.org/search.json?q=" + encodeURIComponent(q) +
      "&limit=1&fields=cover_i";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Open Library request failed");
    const data = await res.json();
    const coverId = data.docs && data.docs[0] && data.docs[0].cover_i;
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
  }

  async function fetchCoverUrl(book) {
    const hit = cached(book.id);
    if (hit !== undefined) return hit.url;
    let url = null;
    try {
      url = await enqueue(() => lookup(book));
    } catch {
      url = null; // network error: don't cache, we'll just try again next visit
      return null;
    }
    cache[book.id] = { url, t: Date.now() };
    persist();
    return url;
  }

  function showPhoto(coverEl, url) {
    if (coverEl.querySelector(".cover-photo")) return;
    const img = new Image();
    img.className = "cover-photo";
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    img.onload = () => coverEl.classList.add("has-photo");
    img.onerror = () => img.remove();
    img.src = url;
    coverEl.appendChild(img);
  }

  const BOOKS_BY_ID = new Map((window.BOOKS || []).map(b => [b.id, b]));

  function enhanceCovers(root) {
    (root || document).querySelectorAll(".cover[data-id]").forEach(coverEl => {
      const book = BOOKS_BY_ID.get(coverEl.dataset.id);
      if (!book || coverEl.dataset.coverChecked) return;
      coverEl.dataset.coverChecked = "1";
      fetchCoverUrl(book).then(url => { if (url) showPhoto(coverEl, url); });
    });
  }

  window.SP = window.SP || {};
  window.SP.enhanceCovers = enhanceCovers;
})();
