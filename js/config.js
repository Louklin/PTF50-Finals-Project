/*
 * Site-wide settings for South Peak Book & Garden Cafe.
 * Edit this file to change business details or the AI model.
 */
window.SITE = {
  name: "South Peak Book & Garden Cafe",
  appName: "South Peak Book Finder",
  since: 2021,
  address: "San Juan Baño, Arayat, Pampanga",
  phone: "0921-543-8679",
  facebook: "https://www.facebook.com/SouthPeakBookAndGardenCafe",
  shopee: "https://ph.shp.ee/RpiWEQBF",
  mapQuery: "South Peak Book and Garden Cafe, San Juan Baño, Arayat, Pampanga",

  // TODO: confirm with the owner, then replace.
  hours: [
    { days: "Monday – Sunday", time: "Ask the café (hours to be confirmed)" }
  ],

  // Set each to false once its data file holds South Peak's real items.
  // Menu is real (transcribed from South Peak's printed menu). Books are a
  // mix of real shelf titles and placeholder titles — set usingSampleBooks
  // to false once every book in data/books.js is a real South Peak title.
  usingSampleBooks: true,
  usingSampleMenu: false
};

/*
 * AI settings for the Book Finder.
 * all-MiniLM-L6-v2 is small (~23 MB quantized) and fast on phones, but trained mostly on English.
 * If testers type a lot of Tagalog/Taglish, try the multilingual model below (bigger download, ~120 MB).
 */
window.AI_CONFIG = {
  transformersUrl: "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2",
  modelId: "Xenova/all-MiniLM-L6-v2",
  // modelId: "Xenova/paraphrase-multilingual-MiniLM-L12-v2",
  dtype: "q8",
  topK: 5,
  // Bonus added when the customer's exact words appear in a book's text (0 = pure AI).
  keywordWeight: 0.15,
  // Below this cosine similarity, results are shown as "loose matches".
  weakMatchBelow: 0.25,

  // The small model understands English best. Before searching, Tagalog/Taglish words
  // found here are swapped for their English meaning ("" = drop the word).
  // Add words your testers actually type!
  glossary: {
    "nakakaiyak": "sad, emotional, makes you cry, tearjerker",
    "iyak": "sad, cry",
    "malungkot": "sad, melancholic",
    "nakakatawa": "funny, humor",
    "tawa": "funny",
    "nakakakilig": "romantic, love story",
    "kilig": "romantic",
    "pag-ibig": "love, romance",
    "nakakatakot": "scary, horror, creepy",
    "multo": "ghost, horror",
    "maikli": "short, quick read",
    "mabilis basahin": "quick read, short",
    "mahaba": "long",
    "magaan": "light, easy",
    "kwento": "story",
    "nobela": "novel",
    "kasaysayan": "history",
    "pamilya": "family",
    "bata": "children",
    "pangarap": "dreams, purpose, inspiring",
    "misteryo": "mystery",
    "libro": "book",
    "aklat": "book",
    "tungkol sa": "about",
    // filler words that make the model think "Filipino" instead of the mood
    "gusto ko ng": "", "gusto ko": "", "gusto": "", "yung": "", "ung": "",
    "ng": "", "na": "", "ang": "", "mga": "", "lang": "", "po": "", "naman": "", "sana": ""
  }
};
