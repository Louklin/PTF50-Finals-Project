/*
 * CAFÉ MENU — REAL DATA
 * ---------------------------------------------------------------------------
 * Transcribed from South Peak's printed menu (photographed 2026-11-09).
 * Prices are pesos, taken exactly as printed. If the café updates its menu,
 * edit this file and the page picks up the change on next load.
 *
 * Fields: see the schema notes in the original file history, or just copy
 * the pattern of an existing item. `prices` (an object) is for items sold
 * in more than one size; `price` (a number) is for single-price items.
 */
window.MENU_CATEGORIES = [
  "Light Bites", "Pasta", "Korean Fried Rice",
  "Coffee-Based", "Frappuccino", "Non-Coffee-Based",
  "Blended Milkshake", "Smoothies", "Lemonade"
];

window.MENU = [
  // ---- Light Bites ----
  { name: "French Fries", category: "Light Bites", price: 80, temp: null, tags: [] },
  { name: "Fried Seaweed Siomai (10 pcs)", category: "Light Bites", price: 120, temp: null, tags: [] },
  { name: "Squid Rings (7 pcs)", category: "Light Bites", price: 120, temp: null, tags: [] },
  { name: "Fish Fillet (7 pcs)", category: "Light Bites", price: 120, temp: null, tags: [] },
  { name: "South Peak Light Bites Set", category: "Light Bites", price: 250, temp: null, tags: [],
    desc: "Fries, siomai, squid rings & fish fillet." },

  // ---- Pasta ----
  { name: "Charlie Chan", category: "Pasta", price: 120, temp: null, tags: [],
    desc: "Sweet, savory, and spicy oriental sauce with chicken and peanuts." },
  { name: "Garlic Parmesan", category: "Pasta", price: 120, temp: null, tags: [] },
  { name: "Beef Spaghetti", category: "Pasta", price: 120, temp: null, tags: [] },

  // ---- Korean Fried Rice (Solo / For 2) ----
  // Add-ons for any flavor: Siomai 3 pcs +₱30, Fried Egg +₱20
  { name: "Spicy Seafood Fried Rice", category: "Korean Fried Rice",
    prices: { "Solo": 80, "For 2": 150 }, temp: null, tags: [],
    desc: "Add-ons: siomai 3 pcs +₱30, fried egg +₱20." },
  { name: "Chicken Fried Rice", category: "Korean Fried Rice",
    prices: { "Solo": 80, "For 2": 150 }, temp: null, tags: [],
    desc: "Add-ons: siomai 3 pcs +₱30, fried egg +₱20." },
  { name: "Chicken Pastil Fried Rice", category: "Korean Fried Rice",
    prices: { "Solo": 80, "For 2": 150 }, temp: null, tags: [],
    desc: "Add-ons: siomai 3 pcs +₱30, fried egg +₱20." },

  // ---- Coffee-Based (Hot/Cold) ----
  { name: "Americano", category: "Coffee-Based", price: 70, temp: "both", tags: ["coffee"] },
  { name: "Cappuccino", category: "Coffee-Based", price: 100, temp: "both", tags: ["coffee"] },
  { name: "Café Latte", category: "Coffee-Based", price: 100, temp: "both", tags: ["coffee"] },
  { name: "Caramel Macchiato", category: "Coffee-Based", price: 120, temp: "both", tags: ["coffee"] },
  { name: "Mocha Latte", category: "Coffee-Based", price: 120, temp: "both", tags: ["coffee"] },
  { name: "White Chocolate Mocha", category: "Coffee-Based", price: 120, temp: "both", tags: ["coffee"] },
  { name: "Sea Salt Cream Latte", category: "Coffee-Based", price: 120, temp: "both", tags: ["coffee"] },
  { name: "Spanish Latte", category: "Coffee-Based", price: 120, temp: "both", tags: ["coffee"] },
  { name: "Hazelnut Mocha Latte", category: "Coffee-Based", price: 120, temp: "both", tags: ["coffee"] },
  { name: "Brown Sugar Cinnamon Latte", category: "Coffee-Based", price: 120, temp: "both", tags: ["coffee"] },
  { name: "Chocolate Caramel Latte", category: "Coffee-Based", price: 120, temp: "both", tags: ["coffee"] },
  { name: "Chocolate Whipped Latte", category: "Coffee-Based", price: 120, temp: "both", tags: ["coffee"] },
  { name: "Biscoff Peanut Butter Latte", category: "Coffee-Based", price: 130, temp: "both", tags: ["coffee"] },
  { name: "Ice Scramble Mocha Latte", category: "Coffee-Based", price: 130, temp: "both", tags: ["coffee"] },
  { name: "Vanilla Blue Mocha Latte", category: "Coffee-Based", price: 130, temp: "both", tags: ["coffee"] },
  { name: "Strawberry White Chocolate Latte", category: "Coffee-Based", price: 130, temp: "both", tags: ["coffee"] },
  { name: "Matcha Espresso Latte", category: "Coffee-Based", price: 130, temp: "both", tags: ["coffee"] },

  // ---- Frappuccino (all ₱145) ----
  { name: "French Vanilla Frappuccino", category: "Frappuccino", price: 145, temp: "iced", tags: ["coffee"] },
  { name: "Java Chips Frappuccino", category: "Frappuccino", price: 145, temp: "iced", tags: ["coffee"] },
  { name: "Cookies & Cream Frappuccino", category: "Frappuccino", price: 145, temp: "iced", tags: ["coffee"] },
  { name: "Dark Chocolate Frappuccino", category: "Frappuccino", price: 145, temp: "iced", tags: ["coffee"] },
  { name: "Biscoff Peanut Butter Frappe", category: "Frappuccino", price: 145, temp: "iced", tags: ["coffee"] },

  // ---- Non-Coffee-Based ----
  { name: "Chocolate", category: "Non-Coffee-Based", price: 100, temp: "both", tags: ["no-coffee"] },
  { name: "Strawberry Choco", category: "Non-Coffee-Based", price: 110, temp: null, tags: ["no-coffee"] },
  { name: "Strawberry Milk", category: "Non-Coffee-Based", price: 100, temp: null, tags: ["no-coffee"] },
  { name: "Matcha Latte", category: "Non-Coffee-Based", price: 100, temp: null, tags: ["no-coffee"] },
  { name: "Blueberry Milk", category: "Non-Coffee-Based", price: 100, temp: null, tags: ["no-coffee"] },
  { name: "Strawberry Matcha", category: "Non-Coffee-Based", price: 120, temp: null, tags: ["no-coffee"] },

  // ---- Blended Milkshake (add-on: whipped cream +₱20) ----
  { name: "Strawberry Milkshake", category: "Blended Milkshake", price: 120, temp: "iced", tags: ["no-coffee"] },
  { name: "Mango Milkshake", category: "Blended Milkshake", price: 120, temp: "iced", tags: ["no-coffee"] },
  { name: "Banana Milkshake", category: "Blended Milkshake", price: 120, temp: "iced", tags: ["no-coffee"] },
  { name: "Blueberry Milkshake", category: "Blended Milkshake", price: 120, temp: "iced", tags: ["no-coffee"] },
  { name: "Matcha Cheesecake Milkshake", category: "Blended Milkshake", price: 120, temp: "iced", tags: ["no-coffee"] },
  { name: "Matcha Oreo Milkshake", category: "Blended Milkshake", price: 135, temp: "iced", tags: ["no-coffee"] },
  { name: "Ice Scramble Mocha Milkshake", category: "Blended Milkshake", price: 120, temp: "iced", tags: ["coffee"] },
  { name: "Strawberry Matcha Milkshake", category: "Blended Milkshake", price: 120, temp: "iced", tags: ["no-coffee"] },

  // ---- Smoothies (blended flavored ice topped w/ nata & popping boba) ----
  { name: "Strawberry Smoothie", category: "Smoothies", price: 100, temp: "iced", tags: ["no-coffee"] },
  { name: "Mango Smoothie", category: "Smoothies", price: 100, temp: "iced", tags: ["no-coffee"] },
  { name: "Blueberry Smoothie", category: "Smoothies", price: 100, temp: "iced", tags: ["no-coffee"] },
  { name: "Green Apple Smoothie", category: "Smoothies", price: 100, temp: "iced", tags: ["no-coffee"] },

  // ---- Lemonade ----
  { name: "Cucumber Lemonade", category: "Lemonade", price: 100, temp: "iced", tags: ["no-coffee"] },
  { name: "Strawberry Lemonade", category: "Lemonade", price: 100, temp: "iced", tags: ["no-coffee"] },
  { name: "Lemongrass Lemonade", category: "Lemonade", price: 100, temp: "iced", tags: ["no-coffee"] }
];
