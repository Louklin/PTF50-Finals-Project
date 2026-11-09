# South Peak Book Finder

An AI-powered web app for **South Peak Book & Garden Cafe** (San Juan Baño, Arayat, Pampanga), built for the PTF50 final project.

**Problem:** customers at a café that's also a bookshop often don't know which book to pick up, and the staff can't recommend books to every table.
**Solution:** customers describe what they're in the mood for, in their own words, and an in-browser AI model finds the closest matches on South Peak's shelf.

| Page | File | AI? |
|---|---|---|
| Home | `index.html` | No: intro, photos, and the full menu (hot/iced, no-coffee, ₱150-and-under filters) |
| Book Finder | `finder.html` | **Yes.** Transformers.js sentence embeddings |
| Book catalog | `books.html` | No: search, genre filter, read/buy filter, sorting |
| Visit info | `visit.html` | No: address, phone, hours, map, Facebook, Shopee |

No backend, no database, no API keys. It's a static site, so it can be hosted free on GitHub Pages.

---

## Run it on your computer

Double-click `index.html` (Home; the AI Book Finder is `finder.html`). It works straight from the folder (internet is needed the first time to download the AI model).

If your browser complains, run a tiny local server from this folder instead:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

(VS Code's "Live Server" extension also works.)

## Put it online (GitHub Pages, free)

1. Create a public GitHub repository, e.g. `southpeak-book-finder`.
2. Upload everything in this folder to the repository root (`index.html` must be at the top level).
3. Repository → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
4. After a minute your site is at `https://<username>.github.io/southpeak-book-finder/`.
5. Open it in an incognito window and on a phone before submitting (the spec asks for this).

Tip: make a QR code of the link for the café tables. You can also link straight to a search: `finder.html?q=cozy+short+book`.

---

## Real data status

- **`data/menu.js`** — ✅ real. Transcribed directly from photos of South Peak's printed menu (54 items across 9 categories: Light Bites, Pasta, Korean Fried Rice, Coffee-Based, Frappuccino, Non-Coffee-Based, Blended Milkshake, Smoothies, Lemonade). One pricing line was ambiguous in the photo — "Korean Fried Rice Solo- PHP 80 for 2- P150" — transcribed as **Solo ₱80 / For 2 ₱150**; worth a quick confirm with the owner. No "bestseller" items are flagged, since the printed menu has no star/marker for that — add the `tags: ["bestseller"]` entry yourself in `data/menu.js` for any items the owner calls out, and the "Bestsellers" filter chip can go back in `menu.html`.
- **`data/books.js`** — 🟡 partially real. Real titles read off South Peak's shelf photos are mixed in with placeholder titles (the owner's Facebook and Shopee pages couldn't be read automatically — Shopee requires login). The "Prototype" notice on the Find/Books pages reflects this. To finish:
  1. Add any remaining real books as entries in `data/books.js`. The field that matters most for the AI is `blurb`: 1–3 sentences in your own words about what the book is about and how it *feels*. Add `moods` words too (e.g. "cozy", "funny", "nakakaiyak").
  2. Remove or replace the remaining placeholder entries.
  3. In **`js/config.js`**, set `usingSampleBooks: false` to remove the "Prototype" notice.
  4. Confirm opening hours with the owner and update `SITE.hours` in `js/config.js`.
  5. Reload the Book Finder — it notices the catalog changed and re-reads every book automatically.

---

## How the AI feature works (for the demo)

The Book Finder uses **semantic search with sentence embeddings**:

1. **Model.** `all-MiniLM-L6-v2`, a small sentence-embedding model (about 23 MB, quantized to 8-bit), loaded with **Transformers.js**. It runs in the browser with WebAssembly. Nothing the customer types leaves their phone.
2. **Embedding the shelf.** For each book we join the title, author, genres, moods and blurb into one text. The model turns it into an **embedding**: 384 numbers that represent its meaning. Texts with similar meanings get similar numbers. These are saved in `localStorage`, so the next visit loads in under a second.
3. **Embedding the request.** The customer's text goes through the same model.
4. **Comparing.** We compute the **cosine similarity** between the request and every book. Because the vectors are normalized, that's just a dot product. Higher means closer in meaning. "A sad story that will make me cry" finds *Tuesdays with Morrie* even though none of those words are in its title.
5. **Hybrid boost.** A small bonus (`keywordWeight: 0.15`) is added when the customer's exact words appear in a book's text. This helps the small model with specific topics and names like "Martial Law" or "aswang".
6. **Filters (normal code).** "Read here / Buy" and the budget are applied after the AI ranks the books.
7. **Explaining the match.** Every mood/genre word is also embedded once. Each result shows the two tags closest to the request ("Closest to your request: cozy, bittersweet").

**Spec quick test:** without the model, the app could only match exact words. "Something to finish over one coffee" would find nothing useful. With the model, it finds short, cozy books. So it's a real AI feature.

**Fallback:** if the model can't download (no internet on first visit), the status turns red and the app switches to plain keyword search so it still works.

**Seeing the raw scores:** hover over (or long-press) the match bar of a result. In the browser console you can also run `SPFinder.search("cozy mystery")` or `SPFinder.translate("nakakaiyak na kwento")`.

### Tagalog and Taglish

The small model was trained mostly on English. Before searching, `translateQuery()` swaps Tagalog words for English using the `glossary` in `js/config.js` ("nakakaiyak" → "sad, emotional, makes you cry", "libro" → "book"), and drops filler words like "gusto ko ng" that would otherwise make the model think "Filipino book". **Add the words your testers actually type.** That's an easy, documentable improvement from user testing.

Alternative: switch `modelId` in `js/config.js` to `Xenova/paraphrase-multilingual-MiniLM-L12-v2`. It handles more languages and ranked a bit better in our checks, but it's a **118 MB** download instead of 23 MB, which is slow on mobile data.

### Known limitations (say these honestly to the client)

- Recommendations are only as good as the blurbs and mood words in `data/books.js`.
- The first visit downloads about 23 MB. Later visits use the phone's cache.
- A small model sometimes ranks odd books highly (e.g. a fantasy book for "scary"). Better mood words in the data help.
- It recommends from South Peak's shelf only. It doesn't know about books the café doesn't have.
- Book availability isn't live. Someone has to update `books.js` when stock changes.

---

## Real cover photos

`js/covers.js` tries to show each book's actual cover instead of the generated color block. It does this live, in the visitor's browser, by asking the **Open Library Covers API** (run by the Internet Archive, free, no key needed) for a match by title and author. This site never downloads or stores cover art itself — only a small image *link* is remembered in the visitor's own browser (`localStorage`) so repeat visits don't re-search every time. If no match is found, the generated color cover is kept.

This means:
- Covers appear a moment after the page loads, not instantly.
- Some books won't have a match (small presses, Filipino titles, specific editions). The color cover is a fine fallback — it's not a bug.
- Occasionally the match is a different edition or translation of the right book (we saw this with a German edition of *Before the Coffee Gets Cold*). That's still accurate, just not the exact cover on our shelf — harmless for a recommendation app.
- If Open Library is briefly down, nothing breaks; every book just shows its color cover that day.

To turn this off (e.g. if your instructor wants fully offline functionality demonstrated), remove the `<script src="js/covers.js">` line from `finder.html` and `books.html`.

---

## Files

```
index.html         Home (intro, photos, menu)
finder.html        Book Finder (AI)
books.html         Catalog
menu.html          Redirects to index.html#menu (old links)
img/              Photos used on the Home page
visit.html         Visit info
css/style.css      All styles (colors taken from the South Peak logo)
js/config.js       Business details, hours, AI settings, Tagalog glossary
js/common.js       Header, phone tab bar, footer, book covers, book popup
js/finder.js       The AI Book Finder
js/catalog.js      Catalog filtering/sorting
js/menu.js         Menu filters
data/books.js      Book catalog (SAMPLE, replace)
data/menu.js       Menu (SAMPLE, replace)
assets/            Logo and icons
```

## Cost note (for the cost computation)

- AI: ₱0 (the Transformers.js model runs in the customer's browser, no API)
- Hosting: ₱0 (GitHub Pages)
- Domain: ₱0 (uses the free github.io link)
- Fonts: Google Fonts, free

## Privacy

The app collects nothing. Requests are processed on the device and not stored or sent anywhere. Only the AI model files and fonts are downloaded from public CDNs.
