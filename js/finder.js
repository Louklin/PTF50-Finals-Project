/*
 * AI BOOK FINDER
 * ---------------------------------------------------------------------------
 * How it works (the part to explain during the demo):
 *
 * 1. We load a sentence-embedding model (all-MiniLM-L6-v2) with Transformers.js.
 *    The model runs in the browser using WebAssembly, so no server and no API key.
 *
 * 2. For each book we build one text: title + author + genres + moods + blurb,
 *    and ask the model for its "embedding": a list of 384 numbers that
 *    represents the MEANING of that text. Texts with similar meaning get similar
 *    numbers. We save these in localStorage so the next visit is instant.
 *
 * 3. When a customer types a request, we embed it the same way and compute the
 *    cosine similarity between the request and every book. Because the
 *    embeddings are normalized, cosine similarity is just a dot product.
 *    Higher = closer in meaning.
 *
 *    We add a small bonus (keywordWeight) when the customer's exact words appear
 *    in the book's text. This "hybrid search" helps with names and specific
 *    topics (e.g. "Martial Law", "aswang") that a small model can miss.
 *
 * 4. Normal (non-AI) code then applies the customer's filters (read here / buy,
 *    budget) and shows the top matches.
 *
 * 5. To explain each match, we also embed every mood/genre word once and show the
 *    two tags of each book that are closest in meaning to the request.
 *
 * If the model can't load (no internet on first visit, very old phone), the app
 * falls back to simple keyword matching and says so on screen.
 *
 * This is a classic script (not type="module") so the site also works when
 * index.html is opened by double-clicking. The library is loaded with import().
 */
(function () {
  const CFG = window.AI_CONFIG;
  const BOOKS = window.BOOKS || [];
  const { esc, coverHTML, availabilityBadges, openBook } = window.SP;

  const form = document.getElementById("finder-form");
  const queryEl = document.getElementById("query");
  const availEl = document.getElementById("f-avail");
  const priceEl = document.getElementById("f-price");
  const searchBtn = document.getElementById("search-btn");
  const statusBox = document.getElementById("ai-status");
  const statusText = document.getElementById("ai-status-text");
  const progressBox = document.getElementById("ai-progress");
  const progressBar = progressBox.querySelector("i");
  const resultsEl = document.getElementById("results");
  const examplesEl = document.getElementById("examples");

  const EXAMPLES = [
    "Something cozy and short I can finish over one coffee",
    "A gripping mystery I can't put down",
    "Funny Filipino book, light lang",
    "Inspiring book about finding my purpose",
    "A sad story that will make me cry",
    "Science fiction but funny",
    "Nakakakilig na love story"
  ];

  let extractor = null;     // the AI model (Transformers.js pipeline)
  let bookVecs = null;      // Float32Array[] — one embedding per book
  let tagVecs = null;       // Map tag -> Float32Array
  let mode = "loading";     // "loading" | "ai" | "keyword"

  // ---------------------------------------------------------------------------
  // UI helpers
  // ---------------------------------------------------------------------------
  function setStatus(text, state, pct) {
    statusText.textContent = text;
    statusBox.classList.toggle("ready", state === "ready");
    statusBox.classList.toggle("error", state === "error");
    if (typeof pct === "number") {
      progressBox.hidden = false;
      progressBar.style.width = Math.max(2, Math.min(100, pct)) + "%";
    } else {
      progressBox.hidden = true;
    }
  }

  examplesEl.innerHTML = EXAMPLES.map(e => `<button type="button" class="chip">${esc(e)}</button>`).join("");
  examplesEl.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    queryEl.value = chip.textContent;
    if (!searchBtn.disabled) form.requestSubmit();
    else queryEl.focus();
  });

  availEl.addEventListener("change", () => {
    priceEl.disabled = availEl.value !== "sale";
    if (priceEl.disabled) priceEl.value = "";
    if (lastQuery) runSearch(lastQuery);
  });
  priceEl.addEventListener("change", () => { if (lastQuery) runSearch(lastQuery); });

  // Enter searches; Shift+Enter makes a new line.
  queryEl.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!searchBtn.disabled) form.requestSubmit();
    }
  });

  // ---------------------------------------------------------------------------
  // Text that the AI reads for each book
  // ---------------------------------------------------------------------------
  function bookText(b) {
    return [
      `${b.title} by ${b.author}.`,
      `Genres: ${(b.genres || []).join(", ")}.`,
      `Mood: ${(b.moods || []).join(", ")}.`,
      b.pages ? (b.pages <= 220 ? "A short, quick read." : b.pages >= 450 ? "A long book." : "") : "",
      b.blurb || ""
    ].join(" ");
  }

  function allTags() {
    const set = new Set();
    BOOKS.forEach(b => [...(b.moods || []), ...(b.genres || [])].forEach(t => set.add(t.toLowerCase())));
    return [...set];
  }

  // Small string hash so we know when the catalog or model changed.
  function hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  // ---------------------------------------------------------------------------
  // Embeddings
  // ---------------------------------------------------------------------------
  async function embed(texts) {
    // pooling "mean" + normalize: one 384-number vector per text, length 1.
    const out = await extractor(texts, { pooling: "mean", normalize: true });
    const [n, dim] = out.dims;
    const data = out.data;
    const vecs = [];
    for (let i = 0; i < n; i++) vecs.push(data.slice(i * dim, (i + 1) * dim));
    return vecs;
  }

  function dot(a, b) {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
  }

  async function embedInBatches(texts, size, onProgress) {
    const vecs = [];
    for (let i = 0; i < texts.length; i += size) {
      vecs.push(...await embed(texts.slice(i, i + size)));
      onProgress && onProgress(Math.min(texts.length, i + size), texts.length);
    }
    return vecs;
  }

  function loadCache(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
  function saveCache(key, value) {
    try {
      // Clear older caches from previous catalog versions first.
      Object.keys(localStorage).filter(k => k.startsWith("sp-emb-") && k !== key).forEach(k => localStorage.removeItem(k));
      localStorage.setItem(key, JSON.stringify(value));
    } catch { /* storage full or blocked: fine, we just recompute next time */ }
  }
  const round = v => Array.from(v, x => Math.round(x * 1e4) / 1e4);

  async function prepareCatalog() {
    const texts = BOOKS.map(bookText);
    const tags = allTags();
    const key = "sp-emb-" + hash(CFG.modelId + "|" + JSON.stringify(texts) + "|" + tags.join(","));
    const cached = loadCache(key);
    if (cached && cached.books?.length === BOOKS.length) {
      bookVecs = cached.books.map(a => Float32Array.from(a));
      tagVecs = new Map(cached.tags.map(([t, a]) => [t, Float32Array.from(a)]));
      return;
    }
    setStatus(`Reading our shelf… 0 of ${BOOKS.length} books`, "loading", 0);
    bookVecs = await embedInBatches(texts, 8, (done, total) =>
      setStatus(`Reading our shelf… ${done} of ${total} books`, "loading", (done / total) * 100));
    const tVecs = await embedInBatches(tags, 32);
    tagVecs = new Map(tags.map((t, i) => [t, tVecs[i]]));
    saveCache(key, { books: bookVecs.map(round), tags: tags.map((t, i) => [t, round(tVecs[i])]) });
  }

  // ---------------------------------------------------------------------------
  // Load the model
  // ---------------------------------------------------------------------------
  async function init() {
    try {
      setStatus("Downloading the AI model (first visit only)…", "loading", 0);
      const { pipeline, env } = await import(CFG.transformersUrl);
      env.allowLocalModels = false; // always fetch the model from the Hugging Face hub

      extractor = await pipeline("feature-extraction", CFG.modelId, {
        dtype: CFG.dtype,
        progress_callback: p => {
          if (p.status === "progress_total" && typeof p.progress === "number") {
            setStatus(`Downloading the AI model (first visit only)… ${Math.round(p.progress)}%`, "loading", p.progress);
          }
        }
      });

      await prepareCatalog();
      mode = "ai";
      setStatus(`AI ready · ${BOOKS.length} books on the shelf`, "ready");
    } catch (err) {
      console.error("Book Finder: AI model failed to load", err);
      mode = "keyword";
      setStatus("The AI couldn't load (check your internet). Using simple keyword search for now.", "error");
    }
    searchBtn.disabled = false;

    // Support links like finder.html?q=funny+mystery (handy for QR codes).
    const q = new URLSearchParams(location.search).get("q");
    if (q) { queryEl.value = q; form.requestSubmit(); }
  }

  // ---------------------------------------------------------------------------
  // Keyword fallback (only used if the AI model fails to load)
  // ---------------------------------------------------------------------------
  const STOP = new Set("a an and the i me my to of for in on with that is it be can want something some book books like about but lang na ng ang".split(" "));
  function words(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").match(/[a-z0-9]+/g)?.filter(w => w.length > 2 && !STOP.has(w)) || [];
  }
  function keywordScores(query) {
    const q = words(query);
    return BOOKS.map(b => {
      const t = new Set(words(bookText(b)));
      const hits = q.filter(w => t.has(w)).length;
      return q.length ? hits / q.length : 0;
    });
  }

  // ---------------------------------------------------------------------------
  // Search
  // ---------------------------------------------------------------------------
  let lastQuery = "";

  function passesFilters(b) {
    const want = availEl.value;
    if (want === "read" && !(b.available === "read" || b.available === "both")) return false;
    if (want === "sale") {
      if (!(b.available === "sale" || b.available === "both") || b.price == null) return false;
      const max = Number(priceEl.value);
      if (max && b.price > max) return false;
    }
    return true;
  }

  function strengthLabel(score) {
    if (mode === "keyword") return score > 0 ? "Keyword match" : "No keyword match";
    if (score >= 0.45) return "Strong match";
    if (score >= 0.32) return "Good match";
    if (score >= CFG.weakMatchBelow) return "Possible match";
    return "Loose match";
  }

  function whyTags(qVec, book) {
    if (!tagVecs) return [];
    const tags = [...(book.moods || []), ...(book.genres || [])].map(t => t.toLowerCase());
    return [...new Set(tags)]
      .map(t => ({ t, s: tagVecs.has(t) ? dot(qVec, tagVecs.get(t)) : 0 }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 2)
      .map(x => x.t);
  }

  // Swap Tagalog words for their English meaning using AI_CONFIG.glossary.
  // Longer phrases first, so "gusto ko ng" is handled before "gusto".
  const GLOSSARY = Object.entries(CFG.glossary || {}).sort((a, b) => b[0].length - a[0].length);
  function translateQuery(query) {
    let q = " " + query.toLowerCase() + " ";
    for (const [tl, en] of GLOSSARY) {
      const re = new RegExp(`(^|[^a-z\u00f1-])${tl.replace(/[-]/g, "\\-")}(?=[^a-z\u00f1-]|$)`, "g");
      q = q.replace(re, (m, pre) => pre + (en ? ` ${en} ` : " "));
    }
    q = q.replace(/\s+/g, " ").replace(/\s+([,.;!?])/g, "$1").trim();
    return q || query;
  }

  async function runSearch(rawQuery) {
    lastQuery = rawQuery;
    const query = translateQuery(rawQuery);
    let scores, aiScores = null, qVec = null;
    const t0 = performance.now();

    if (mode === "ai") {
      // Hybrid score: AI meaning similarity + a small bonus when the customer's
      // exact words (e.g. "Martial Law", "aswang") appear in the book's text.
      [qVec] = await embed([query]);
      const kw = keywordScores(query);
      aiScores = bookVecs.map(v => dot(qVec, v));
      scores = aiScores.map((s, i) => s + CFG.keywordWeight * kw[i]);
    } else {
      scores = keywordScores(query);
    }
    const ms = Math.round(performance.now() - t0);

    const ranked = BOOKS
      .map((b, i) => ({ b, score: scores[i], ai: aiScores ? aiScores[i] : null }))
      .filter(r => passesFilters(r.b))
      .sort((x, y) => y.score - x.score)
      .slice(0, CFG.topK);

    renderResults(rawQuery, ranked, qVec, ms);
  }

  function renderResults(query, ranked, qVec, ms) {
    resultsEl.hidden = false;
    if (!ranked.length) {
      resultsEl.innerHTML = `<div class="notice">No books match those filters. Try "Read or buy" or a higher budget.</div>`;
      return;
    }
    const top = ranked[0].score;
    const weak = mode === "ai" ? top < CFG.weakMatchBelow : top === 0;
    const scale = s => mode === "ai"
      ? Math.max(6, Math.min(100, ((s - 0.05) / 0.5) * 100))
      : Math.round(s * 100);

    resultsEl.innerHTML = `
      <div class="results-head">
        <h2>Our picks for you</h2>
        <span class="small muted">${mode === "ai" ? `Ranked by AI meaning match · ${ms} ms` : "Keyword search (AI unavailable)"}</span>
      </div>
      ${weak ? `<div class="notice" style="margin-top:8px">We don't have a close match for "${esc(query)}". These are the nearest books we have. Try describing a mood, genre, or topic.</div>` : ""}
      <div class="result-list">
        ${ranked.map((r, i) => {
          const why = qVec ? whyTags(qVec, r.b) : [];
          return `
          <button type="button" class="card result" data-id="${esc(r.b.id)}">
            ${coverHTML(r.b)}
            <div>
              <div class="rank">#${i + 1}</div>
              <div class="t">${esc(r.b.title)}</div>
              <div class="a">${esc(r.b.author)}</div>
              <p class="blurb">${esc(r.b.blurb)}</p>
              <div class="foot">
                <span class="match" title="${r.ai != null ? `AI similarity ${r.ai.toFixed(3)} · final score ${r.score.toFixed(3)}` : `Keyword score ${r.score.toFixed(2)}`}">
                  <span class="bar"><i style="width:${scale(r.score)}%"></i></span>${strengthLabel(r.score)}
                </span>
                ${availabilityBadges(r.b)}
              </div>
              ${why.length ? `<div class="small muted" style="margin-top:6px">Closest to your request: ${why.map(esc).join(", ")}</div>` : ""}
            </div>
          </button>`;
        }).join("")}
      </div>`;
    window.SP.enhanceCovers && window.SP.enhanceCovers(resultsEl);
  }

  resultsEl.addEventListener("click", e => {
    const card = e.target.closest(".result");
    if (!card) return;
    const book = BOOKS.find(b => b.id === card.dataset.id);
    if (book) openBook(book);
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const q = queryEl.value.trim();
    if (!q) { queryEl.focus(); return; }
    searchBtn.disabled = true;
    searchBtn.textContent = "Finding…";
    try {
      await runSearch(q);
      resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      console.error(err);
      resultsEl.hidden = false;
      resultsEl.innerHTML = `<div class="notice">Something went wrong. Please try again.</div>`;
    } finally {
      searchBtn.disabled = false;
      searchBtn.textContent = "Find my book";
    }
  });

  // Expose for testing in the browser console: SPFinder.search("cozy")
  window.SPFinder = { search: runSearch, translate: translateQuery, get mode() { return mode; } };

  init();
})();
