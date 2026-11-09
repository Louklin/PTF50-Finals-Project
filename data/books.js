/*
 * BOOK CATALOG — SAMPLE DATA
 * ---------------------------------------------------------------------------
 * These are placeholder titles and prices so the app works during development.
 * Replace them with South Peak's real books before user testing.
 *
 * Fields:
 *   id        unique short text, no spaces
 *   title     book title
 *   author    author name(s)
 *   genres    list of genres (used for the catalog filter AND by the AI)
 *   moods     a few words describing how the book feels (used by the AI)
 *   pages     approximate page count (optional)
 *   blurb     1–3 sentences in your own words. The AI reads this, so describe
 *             what the book is about and how it feels, not just the plot.
 *   available "read"  = can be read inside the café only
 *             "sale"  = for sale only
 *             "both"  = read in café or buy
 *   price     selling price in pesos (leave null if not for sale)
 *   color     cover color for the placeholder cover (any CSS color)
 *
 * After editing, reload the Book Finder page. The app notices the catalog
 * changed and re-reads it automatically.
 */
window.BOOKS = [
  {
    id: "noli", title: "Noli Me Tangere", author: "José Rizal",
    genres: ["Filipino", "Classic", "Historical fiction"],
    moods: ["serious", "patriotic", "romantic", "eye-opening"],
    pages: 480,
    blurb: "Crisostomo Ibarra returns home from Europe and runs into the abuses of friars and officials in Spanish-era Philippines. A love story, a social critique, and the novel that shaped a nation.",
    available: "both", price: 350, color: "#7a3b2e"
  },
  {
    id: "dekada70", title: "Dekada '70", author: "Lualhati Bautista",
    genres: ["Filipino", "Historical fiction", "Family"],
    moods: ["emotional", "political", "heavy", "moving"],
    pages: 280,
    blurb: "A middle-class mother watches her five sons get pulled into the turmoil of Martial Law, and slowly finds her own voice. A Tagalog novel about family, fear, and waking up.",
    available: "both", price: 320, color: "#8c5a2b"
  },
  {
    id: "smaller-circles", title: "Smaller and Smaller Circles", author: "F.H. Batacan",
    genres: ["Filipino", "Mystery", "Crime"],
    moods: ["dark", "suspenseful", "gripping"],
    pages: 360,
    blurb: "Two Jesuit priests, a forensic anthropologist and a psychologist, hunt a serial killer in the Payatas dumpsite in Quezon City. Considered the first Filipino crime novel.",
    available: "sale", price: 450, color: "#2e3a40"
  },
  {
    id: "abnkkbsnplako", title: "ABNKKBSNPLAko?!", author: "Bob Ong",
    genres: ["Filipino", "Humor", "Memoir"],
    moods: ["funny", "nostalgic", "light", "relatable"],
    pages: 220,
    blurb: "A funny, honest look back at growing up in the Filipino school system, from elementary to college. Written in casual Taglish, easy to finish in one sitting.",
    available: "both", price: 195, color: "#d9a62e"
  },
  {
    id: "paboritong-libro", title: "Ang Paboritong Libro ni Hudas", author: "Bob Ong",
    genres: ["Filipino", "Humor", "Essays"],
    moods: ["funny", "satirical", "thought-provoking", "light"],
    pages: 200,
    blurb: "Short, sarcastic essays poking fun at Filipino habits, politics, and religion. Laugh-out-loud but with a point.",
    available: "read", price: null, color: "#a33b3b"
  },
  {
    id: "trese", title: "Trese: Murder on Balete Drive", author: "Budjette Tan & Kajo Baldisimo",
    genres: ["Filipino", "Graphic novel", "Fantasy", "Horror"],
    moods: ["dark", "creepy", "action", "quick read"],
    pages: 120,
    blurb: "Alexandra Trese solves crimes in a Manila where aswang, tikbalang, and diwata live in the shadows. A black-and-white comic full of Philippine folklore.",
    available: "both", price: 280, color: "#1f1f1f"
  },
  {
    id: "ilustrado", title: "Ilustrado", author: "Miguel Syjuco",
    genres: ["Filipino", "Literary fiction", "Mystery"],
    moods: ["clever", "satirical", "layered", "challenging"],
    pages: 310,
    blurb: "A young writer investigates the mysterious death of his mentor, a famous Filipino exile, piecing together his life from fragments of novels, interviews, and blog posts.",
    available: "read", price: null, color: "#3d5a6c"
  },
  {
    id: "america-heart", title: "America Is in the Heart", author: "Carlos Bulosan",
    genres: ["Filipino", "Memoir", "Classic"],
    moods: ["moving", "heavy", "hopeful", "eye-opening"],
    pages: 330,
    blurb: "A semi-autobiographical account of a Filipino farm boy who migrates to America in the 1930s and faces poverty, racism, and hard labor while holding on to his dreams.",
    available: "both", price: 420, color: "#6b4c3b"
  },
  {
    id: "coffee-cold", title: "Before the Coffee Gets Cold", author: "Toshikazu Kawaguchi",
    genres: ["Fiction", "Magical realism", "Translated"],
    moods: ["gentle", "bittersweet", "cozy", "emotional", "quick read"],
    pages: 210,
    blurb: "In a small Tokyo café, one seat lets you travel back in time, but only until your coffee gets cold. Four quiet stories about regret, love, and things left unsaid.",
    available: "both", price: 499, color: "#b07a4f"
  },
  {
    id: "little-prince", title: "The Little Prince", author: "Antoine de Saint-Exupéry",
    genres: ["Classic", "Children", "Fable"],
    moods: ["whimsical", "gentle", "philosophical", "short"],
    pages: 96,
    blurb: "A pilot stranded in the desert meets a small prince from another planet. A short illustrated fable about friendship, love, and seeing with the heart. Great for any age.",
    available: "both", price: 250, color: "#3b6ea5"
  },
  {
    id: "alchemist", title: "The Alchemist", author: "Paulo Coelho",
    genres: ["Fiction", "Fable", "Inspirational"],
    moods: ["inspiring", "hopeful", "spiritual", "short"],
    pages: 180,
    blurb: "A shepherd boy leaves home to chase a dream about hidden treasure near the pyramids. A short, simple story about following your purpose.",
    available: "both", price: 399, color: "#c58b2a"
  },
  {
    id: "norwegian-wood", title: "Norwegian Wood", author: "Haruki Murakami",
    genres: ["Literary fiction", "Romance", "Translated"],
    moods: ["melancholic", "nostalgic", "romantic", "slow"],
    pages: 390,
    blurb: "A Tokyo college student in the late 1960s is torn between two very different women while dealing with grief. Quiet, sad, and beautifully written.",
    available: "read", price: null, color: "#2f5e3a"
  },
  {
    id: "midnight-library", title: "The Midnight Library", author: "Matt Haig",
    genres: ["Fiction", "Fantasy", "Contemporary"],
    moods: ["uplifting", "thoughtful", "hopeful", "emotional"],
    pages: 300,
    blurb: "Between life and death is a library where every book is a different version of your life. Nora gets to try the lives she didn't choose. A hopeful story about regret and second chances.",
    available: "both", price: 599, color: "#1e2a4a"
  },
  {
    id: "pride-prejudice", title: "Pride and Prejudice", author: "Jane Austen",
    genres: ["Classic", "Romance"],
    moods: ["witty", "romantic", "charming"],
    pages: 430,
    blurb: "Sharp-tongued Elizabeth Bennet and proud Mr. Darcy can't stand each other, at first. A witty, funny romance about first impressions and family drama.",
    available: "both", price: 299, color: "#9b6b8a"
  },
  {
    id: "hobbit", title: "The Hobbit", author: "J.R.R. Tolkien",
    genres: ["Fantasy", "Adventure", "Classic"],
    moods: ["adventurous", "cozy", "fun", "magical"],
    pages: 310,
    blurb: "Homebody Bilbo Baggins is dragged on a quest with thirteen dwarves and a wizard to steal treasure from a dragon. A classic adventure with riddles, trolls, and a lot of second breakfasts.",
    available: "read", price: null, color: "#4f6b2f"
  },
  {
    id: "hail-mary", title: "Project Hail Mary", author: "Andy Weir",
    genres: ["Science fiction", "Adventure"],
    moods: ["exciting", "funny", "smart", "heartwarming"],
    pages: 480,
    blurb: "A science teacher wakes up alone on a spaceship with no memory and has to save Earth using science. Funny, nerdy, and surprisingly heartwarming, with an unforgettable friendship.",
    available: "sale", price: 699, color: "#c4682c"
  },
  {
    id: "klara-sun", title: "Klara and the Sun", author: "Kazuo Ishiguro",
    genres: ["Literary fiction", "Science fiction"],
    moods: ["quiet", "tender", "bittersweet", "thoughtful"],
    pages: 300,
    blurb: "Klara, a robot companion, watches the world from a store window and later cares for a sick girl. A gentle story about love and what makes us human.",
    available: "read", price: null, color: "#e0b84a"
  },
  {
    id: "cerulean-sea", title: "The House in the Cerulean Sea", author: "TJ Klune",
    genres: ["Fantasy", "Romance", "Contemporary"],
    moods: ["cozy", "heartwarming", "funny", "feel-good"],
    pages: 400,
    blurb: "A by-the-book caseworker is sent to an island orphanage for magical children, including the son of the Antichrist. A warm, funny story about found family and acceptance.",
    available: "both", price: 650, color: "#3a8fa3"
  },
  {
    id: "orient-express", title: "Murder on the Orient Express", author: "Agatha Christie",
    genres: ["Mystery", "Classic", "Crime"],
    moods: ["suspenseful", "clever", "classic whodunit"],
    pages: 260,
    blurb: "A train is stuck in the snow, a passenger is found stabbed, and detective Hercule Poirot must find the killer among a dozen suspects. The classic locked-room puzzle.",
    available: "both", price: 350, color: "#5c2a2a"
  },
  {
    id: "secret-garden", title: "The Secret Garden", author: "Frances Hodgson Burnett",
    genres: ["Classic", "Children", "Nature"],
    moods: ["gentle", "hopeful", "healing", "cozy"],
    pages: 280,
    blurb: "A lonely, spoiled girl finds a locked, forgotten garden and brings it back to life, healing herself and a sickly cousin along the way. Perfect for reading in a garden.",
    available: "both", price: 220, color: "#55804a"
  },
  {
    id: "sweetgrass", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer",
    genres: ["Nonfiction", "Nature", "Essays"],
    moods: ["calming", "reflective", "gentle", "wise"],
    pages: 390,
    blurb: "A botanist and Indigenous writer shares essays on plants, gardening, and gratitude, mixing science with traditional knowledge. Slow, calming, and good for plant lovers.",
    available: "read", price: null, color: "#7d8f4e"
  },
  {
    id: "atomic-habits", title: "Atomic Habits", author: "James Clear",
    genres: ["Self-help", "Nonfiction", "Productivity"],
    moods: ["practical", "motivating", "easy to read"],
    pages: 320,
    blurb: "How tiny daily changes add up to big results. Practical tips for building good habits and breaking bad ones, useful for studying, work, or fitness.",
    available: "sale", price: 899, color: "#e8e1d1"
  },
  {
    id: "ikigai", title: "Ikigai", author: "Héctor García & Francesc Miralles",
    genres: ["Self-help", "Nonfiction", "Wellness"],
    moods: ["calm", "light", "inspiring", "short"],
    pages: 200,
    blurb: "Lessons from the long-living people of Okinawa, Japan, on finding your purpose and living a slower, happier life. Light and easy to finish over a few cups.",
    available: "both", price: 550, color: "#c94f3b"
  },
  {
    id: "sapiens", title: "Sapiens", author: "Yuval Noah Harari",
    genres: ["Nonfiction", "History", "Science"],
    moods: ["mind-blowing", "thought-provoking", "dense"],
    pages: 460,
    blurb: "A big-picture history of humankind, from early humans to money, religion, and empires. Makes you see everyday life differently.",
    available: "read", price: null, color: "#d6c7a1"
  },
  {
    id: "morrie", title: "Tuesdays with Morrie", author: "Mitch Albom",
    genres: ["Memoir", "Nonfiction", "Inspirational"],
    moods: ["tearjerker", "wise", "gentle", "short"],
    pages: 200,
    blurb: "A journalist visits his dying college professor every Tuesday, and they talk about love, work, family, and death. Short, simple, and will make you cry.",
    available: "both", price: 399, color: "#8aa6b8"
  },
  {
    id: "educated", title: "Educated", author: "Tara Westover",
    genres: ["Memoir", "Nonfiction"],
    moods: ["intense", "inspiring", "eye-opening"],
    pages: 340,
    blurb: "A woman raised by survivalist parents in the mountains, who never went to school, teaches herself enough to get into college and eventually earns a PhD.",
    available: "sale", price: 650, color: "#5a6e7f"
  },
  {
    id: "wallflower", title: "The Perks of Being a Wallflower", author: "Stephen Chbosky",
    genres: ["Young adult", "Coming of age"],
    moods: ["nostalgic", "emotional", "relatable", "bittersweet"],
    pages: 220,
    blurb: "A shy high school freshman writes letters about making friends, first love, mixtapes, and dealing with past trauma. A tender coming-of-age story.",
    available: "both", price: 450, color: "#8c3f5d"
  },
  {
    id: "convenience-store", title: "Convenience Store Woman", author: "Sayaka Murata",
    genres: ["Literary fiction", "Translated", "Contemporary"],
    moods: ["quirky", "darkly funny", "short", "thought-provoking"],
    pages: 160,
    blurb: "A 36-year-old woman has worked at the same convenience store for 18 years and is perfectly happy, until everyone pressures her to be 'normal.' Short, strange, and funny.",
    available: "read", price: null, color: "#4caf9a"
  },
  {
    id: "hitchhiker", title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams",
    genres: ["Science fiction", "Humor"],
    moods: ["absurd", "hilarious", "light", "fun"],
    pages: 210,
    blurb: "Seconds before Earth is demolished for a space highway, Arthur Dent is rescued by an alien friend and dragged across the galaxy. Silly, clever British comedy in space.",
    available: "both", price: 380, color: "#2b2b6b"
  },
  {
    id: "dune", title: "Dune", author: "Frank Herbert",
    genres: ["Science fiction", "Epic", "Adventure"],
    moods: ["epic", "dense", "political", "immersive"],
    pages: 650,
    blurb: "On a desert planet that holds the universe's most valuable resource, a young noble's family is betrayed, and he must survive among the desert people. A long, deep sci-fi epic.",
    available: "sale", price: 750, color: "#c98a3d"
  },
  {
    id: "little-women", title: "Little Women", author: "Louisa May Alcott",
    genres: ["Classic", "Family", "Coming of age"],
    moods: ["warm", "heartwarming", "nostalgic", "gentle"],
    pages: 450,
    blurb: "Four sisters grow up during hard times in 1860s America, each chasing different dreams. A warm story about sisterhood, family, and growing up.",
    available: "read", price: null, color: "#b5656f"
  },
  {
    id: "mga-ibong-mandaragit", title: "Mga Ibong Mandaragit", author: "Amado V. Hernandez",
    genres: ["Filipino", "Classic", "Social realism"],
    moods: ["political", "serious", "powerful"],
    pages: 400,
    blurb: "A Tagalog novel about a man who returns from war to fight greed, land grabbing, and corruption among the powerful. A sharp social novel about justice in the Philippines.",
    available: "read", price: null, color: "#6e2d2d"
  },

  /* ===========================================================================
   * REAL BOOKS — read off South Peak's actual shelf photos (2026-11-08)
   * ---------------------------------------------------------------------------
   * Most spines carry the café's own red "open book" checkout sticker, so these
   * are marked available: "read" by default. CONFIRM with the owner which of
   * these (if any) are also sold, and set price accordingly.
   * Only two shelves were photographed — there's clearly much more stock.
   * Photograph the rest (straight-on, good light, one shelf per photo) and I
   * can add them the same way.
   * =========================================================================== */
  {
    id: "object-of-beauty", title: "An Object of Beauty", author: "Steve Martin",
    genres: ["Literary fiction", "Satire"],
    moods: ["witty", "glamorous", "sharp"],
    blurb: "A sharp, funny novel about a young, ambitious woman climbing through the New York art world during its boom years, written by the actor and comedian Steve Martin.",
    available: "read", price: null, color: "#eae3d3"
  },
  {
    id: "scrappy-little-nobody", title: "Scrappy Little Nobody", author: "Anna Kendrick",
    genres: ["Memoir", "Humor"],
    moods: ["funny", "candid", "relatable"],
    blurb: "Actress Anna Kendrick's funny, self-deprecating essays on an awkward childhood, early auditions, and life as a famously tiny, anxious adult.",
    available: "read", price: null, color: "#e9cf7b"
  },
  {
    id: "swan-thieves", title: "The Swan Thieves", author: "Elizabeth Kostova",
    genres: ["Literary fiction", "Mystery"],
    moods: ["atmospheric", "mysterious", "artistic"],
    blurb: "A psychiatrist tries to understand why a gifted painter attacked a museum painting, and uncovers a hidden love story tied to 19th-century French art.",
    available: "read", price: null, color: "#c6a467"
  },
  {
    id: "wildwood", title: "Wildwood", author: "Colin Meloy",
    genres: ["Fantasy", "Adventure", "Middle grade"],
    moods: ["whimsical", "adventurous", "magical"],
    blurb: "When her baby brother is carried off by crows, Prue follows him into the wild, forbidden woods beside her city and discovers a hidden world of talking animals and warring factions.",
    available: "read", price: null, color: "#f1ede0"
  },
  {
    id: "dumplin", title: "Dumplin'", author: "Julie Murphy",
    genres: ["Young adult", "Contemporary"],
    moods: ["funny", "heartwarming", "body-positive"],
    blurb: "A self-proclaimed fat girl named Willowdean enters her small Texas town's beauty pageant to shake things up, and ends up figuring out who she really wants to be.",
    available: "read", price: null, color: "#17181a"
  },
  {
    id: "puddin", title: "Puddin'", author: "Julie Murphy",
    genres: ["Young adult", "Contemporary"],
    moods: ["funny", "heartwarming", "friendship"],
    blurb: "The companion novel to Dumplin' follows two very different girls, one chasing a dream job and one escaping weight-loss camp, who become unlikely friends.",
    available: "read", price: null, color: "#c0392b"
  },
  {
    id: "twinkle-love", title: "From Twinkle, with Love", author: "Sandhya Menon",
    genres: ["Young adult", "Romance"],
    moods: ["sweet", "nakakakilig", "funny"],
    blurb: "Aspiring filmmaker Twinkle Mehra finally gets the chance to direct a movie, while secretly exchanging love letters with a mystery admirer she's trying to identify.",
    available: "read", price: null, color: "#d6447a"
  },
  {
    id: "ten-things-we-did", title: "Ten Things We Did (and Probably Shouldn't Have)", author: "Sarah Mlynowski",
    genres: ["Young adult", "Humor"],
    moods: ["funny", "chaotic", "light"],
    blurb: "April moves in with her best friend to hide a secret boyfriend from her strict dad, and a list of ten 'harmless' rules spirals into total chaos.",
    available: "read", price: null, color: "#e8894a"
  },
  {
    id: "nine-perfect-strangers", title: "Nine Perfect Strangers", author: "Liane Moriarty",
    genres: ["Mystery", "Thriller", "Contemporary"],
    moods: ["suspenseful", "darkly funny", "twisty"],
    blurb: "Nine stressed-out strangers check into a secluded wellness resort for ten days of healing, not realizing their host has something far stranger planned than yoga and smoothies.",
    available: "read", price: null, color: "#2e2e52"
  },
  {
    id: "husbands-secret", title: "The Husband's Secret", author: "Liane Moriarty",
    genres: ["Mystery", "Domestic fiction"],
    moods: ["suspenseful", "emotional", "twisty"],
    blurb: "A sealed letter marked 'to be opened only after my death' turns a suburban wife's ordinary life upside down when she finds it years too early.",
    available: "read", price: null, color: "#f3efe4"
  },
  {
    id: "glittering-court", title: "The Glittering Court", author: "Richelle Mead",
    genres: ["Fantasy", "Romance", "Young adult"],
    moods: ["adventurous", "romantic", "glamorous"],
    blurb: "A countess fakes her own death to escape an arranged marriage, posing as a servant and enrolling in a finishing school that trains women to marry into New World wealth.",
    available: "read", price: null, color: "#2c3e50"
  },
  {
    id: "and-another-thing", title: "And Another Thing...", author: "Eoin Colfer",
    genres: ["Science fiction", "Humor"],
    moods: ["absurd", "funny", "adventurous"],
    blurb: "The sixth book in The Hitchhiker's Guide to the Galaxy series, written with the blessing of Douglas Adams's estate, sends Arthur Dent and friends hurtling toward one last, ridiculous threat to Earth.",
    available: "read", price: null, color: "#34495e"
  },
  {
    id: "eternity-code", title: "The Eternity Code", author: "Eoin Colfer",
    genres: ["Fantasy", "Adventure", "Middle grade"],
    moods: ["fast-paced", "funny", "clever"],
    blurb: "Teen genius Artemis Fowl's stolen fairy technology falls into the hands of a ruthless businessman, forcing an uneasy alliance with the fairies he once outsmarted.",
    available: "read", price: null, color: "#1b3a2b"
  },
  {
    id: "opal-deception", title: "The Opal Deception", author: "Eoin Colfer",
    genres: ["Fantasy", "Adventure", "Middle grade"],
    moods: ["suspenseful", "fast-paced", "clever"],
    blurb: "A vengeful enemy Artemis can barely remember meeting returns for revenge, in one of the darkest entries in the Artemis Fowl series.",
    available: "read", price: null, color: "#223a2a"
  },
  {
    id: "time-paradox", title: "The Time Paradox", author: "Eoin Colfer",
    genres: ["Fantasy", "Adventure", "Middle grade"],
    moods: ["emotional", "fast-paced", "clever"],
    blurb: "To save his dying mother, Artemis must travel back in time and face a younger, far more ruthless version of himself.",
    available: "read", price: null, color: "#24402f"
  },
  {
    id: "warp-reluctant-assassin", title: "WARP: The Reluctant Assassin", author: "Eoin Colfer",
    genres: ["Science fiction", "Thriller", "Young adult"],
    moods: ["fast-paced", "suspenseful"],
    blurb: "A time-traveling assassin from Victorian London and a young London constable are thrown together across centuries, in the first book of Eoin Colfer's WARP series.",
    available: "read", price: null, color: "#1f4e63"
  },
  {
    id: "wish-list", title: "The Wish List", author: "Eoin Colfer",
    genres: ["Fantasy", "Middle grade"],
    moods: ["funny", "heartwarming", "adventurous"],
    blurb: "After dying in a freak accident, troubled teenager Meg Finn ends up exactly balanced between heaven and hell, and has to earn her way in by helping the old man she once wronged.",
    available: "read", price: null, color: "#7a2a2a"
  },
  {
    id: "stranger-fanfiction", title: "Stranger Than Fanfiction", author: "Chris Colfer",
    genres: ["Young adult", "Contemporary"],
    moods: ["funny", "heartfelt", "relatable"],
    blurb: "A famous teen actor invites his awkward childhood best friends on a cross-country road trip, hoping to reconnect before fame pulls them apart for good.",
    available: "read", price: null, color: "#5b3a29"
  },
  {
    id: "dress-codes-small-towns", title: "Dress Codes for Small Towns", author: "Courtney Stevens",
    genres: ["Young adult", "Contemporary"],
    moods: ["heartfelt", "funny", "identity"],
    blurb: "A preacher's daughter in a small Southern town wrestles with faith, friendship, and falling for her best friend while competing in the town's quirky beauty pageant.",
    available: "read", price: null, color: "#8e6b8e"
  },
  {
    id: "the-knockoff", title: "The Knockoff", author: "Lucy Sykes & Jo Piazza",
    genres: ["Contemporary", "Satire", "Workplace"],
    moods: ["funny", "fast-paced", "glamorous"],
    blurb: "A fashion magazine editor is blindsided when her twenty-something former assistant returns as her new tech-obsessed boss, in a satirical take on old media versus app culture.",
    available: "read", price: null, color: "#d35400"
  },
  {
    id: "conspiracy-of-bones", title: "A Conspiracy of Bones", author: "Kathy Reichs",
    genres: ["Mystery", "Crime", "Thriller"],
    moods: ["suspenseful", "dark", "gripping"],
    blurb: "Forensic anthropologist Temperance Brennan investigates a faceless corpse and a string of anonymous threats that may be tied to a decades-old conspiracy.",
    available: "read", price: null, color: "#1a2744"
  },
  {
    id: "bones-to-ashes", title: "Bones to Ashes", author: "Kathy Reichs",
    genres: ["Mystery", "Crime", "Thriller"],
    moods: ["suspenseful", "emotional", "gripping"],
    blurb: "A set of young bones reopens the unsolved disappearance of forensic anthropologist Temperance Brennan's childhood best friend, pulling her back into her own past.",
    available: "read", price: null, color: "#162238"
  },
  {
    id: "flash-and-bones", title: "Flash and Bones", author: "Kathy Reichs",
    genres: ["Mystery", "Crime", "Thriller"],
    moods: ["suspenseful", "fast-paced", "gripping"],
    blurb: "A body found near a NASCAR superspeedway drags forensic anthropologist Temperance Brennan into a case tangled up with a decades-old disappearance.",
    available: "read", price: null, color: "#223355"
  },
  {
    id: "save-me-scottoline", title: "Save Me", author: "Lisa Scottoline",
    genres: ["Thriller", "Suspense"],
    moods: ["suspenseful", "emotional", "gripping"],
    blurb: "A split-second decision during a school cafeteria explosion, to save one child over another, spirals into a mother's fight to clear her name.",
    available: "read", price: null, color: "#4a6741"
  },
  {
    id: "keep-quiet", title: "Keep Quiet", author: "Lisa Scottoline",
    genres: ["Thriller", "Domestic suspense"],
    moods: ["suspenseful", "tense", "moral dilemma"],
    blurb: "A split-second cover-up after a fatal accident involving his teenage son pulls a father into a widening web of lies.",
    available: "read", price: null, color: "#2f3e2f"
  },
  {
    id: "hundred-secret-senses", title: "The Hundred Secret Senses", author: "Amy Tan",
    genres: ["Literary fiction", "Family", "Magical realism"],
    moods: ["moving", "mystical", "bittersweet"],
    blurb: "A skeptical Chinese-American woman is drawn into her half-sister's vivid, otherworldly memories of a past life, blurring the line between family story and myth.",
    available: "read", price: null, color: "#6b7a8f"
  },
  {
    id: "best-friends-forever", title: "Best Friends Forever", author: "Jennifer Weiner",
    genres: ["Women's fiction", "Contemporary"],
    moods: ["heartwarming", "emotional", "friendship"],
    blurb: "When a desperate childhood friend shows up at her door after a hit-and-run, Addie has to decide how far loyalty should really go.",
    available: "read", price: null, color: "#9b7653"
  },
  {
    id: "fly-away-home", title: "Fly Away Home", author: "Jennifer Weiner",
    genres: ["Women's fiction", "Family"],
    moods: ["emotional", "hopeful", "family drama"],
    blurb: "After her senator husband's affair becomes public, a devoted political wife and her two adult daughters retreat to the family's old beach house to rebuild their lives.",
    available: "read", price: null, color: "#7a8ca3"
  },
  {
    id: "who-do-you-love", title: "Who Do You Love", author: "Jennifer Weiner",
    genres: ["Romance", "Women's fiction"],
    moods: ["romantic", "emotional", "nostalgic"],
    blurb: "Two strangers keep reuniting by chance across the decades, in a love story about timing, loss, and the relationships that quietly shape us.",
    available: "read", price: null, color: "#4a5d7a"
  },
  {
    id: "milk-in-my-coffee", title: "Milk in My Coffee", author: "Eric Jerome Dickey",
    genres: ["Romance", "Contemporary"],
    moods: ["romantic", "funny", "bittersweet"],
    blurb: "An interracial romance between two New Yorkers navigating family expectations, old baggage, and whether they can build something lasting together.",
    available: "read", price: null, color: "#3d2b1f"
  },
  {
    id: "shock-cook", title: "Shock", author: "Robin Cook",
    genres: ["Thriller", "Medical"],
    moods: ["suspenseful", "dark", "fast-paced"],
    blurb: "Two graduate students donate eggs to pay for school and stumble onto a disturbing fertility-clinic conspiracy that puts their lives at risk.",
    available: "read", price: null, color: "#1f1f1f"
  },
  {
    id: "seizure-cook", title: "Seizure", author: "Robin Cook",
    genres: ["Thriller", "Medical"],
    moods: ["suspenseful", "political", "fast-paced"],
    blurb: "A US senator undergoing an experimental stem-cell treatment becomes the center of a thriller about ambition, politics, and bioethics.",
    available: "read", price: null, color: "#262626"
  },
  {
    id: "first-break-all-rules", title: "First, Break All the Rules", author: "Marcus Buckingham & Curt Coffman",
    genres: ["Nonfiction", "Business", "Management"],
    moods: ["practical", "insightful"],
    blurb: "Drawing on large-scale Gallup interviews with managers, this book argues the best managers break conventional wisdom to get the most out of their teams.",
    available: "read", price: null, color: "#1e3a3a"
  },

  /* ===========================================================================
   * REAL BOOKS, BATCH 2 — photos from 2026-11-09.
   * The Harry Potter and Stieg Larsson / David Lagercrantz titles below are
   * shrink-wrapped and sit next to a "PLEASE DO NOT OPEN SEALED/WRAPPED BOOKS"
   * sign, which reads as new stock for sale rather than café reading copies —
   * marked available: "sale" with price left null until the owner confirms.
   * Everything else in this batch had no sealed wrapping, so it follows the
   * same "read in café" default as batch 1 pending owner confirmation.
   * =========================================================================== */
  {
    id: "hp-cursed-child", title: "Harry Potter and the Cursed Child, Parts One and Two",
    author: "J.K. Rowling, John Tiffany & Jack Thorne",
    genres: ["Fantasy", "Play script", "Young adult"],
    moods: ["magical", "nostalgic", "emotional"],
    blurb: "The eighth Harry Potter story, told as a stage play script, follows an adult Harry's son Albus as he struggles under the weight of his father's legacy.",
    available: "sale", price: null, color: "#d9a62e"
  },
  {
    id: "hp-sorcerers-stone", title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling",
    genres: ["Fantasy", "Adventure", "Middle grade"],
    moods: ["magical", "adventurous", "nostalgic"],
    blurb: "An orphaned boy discovers he's a wizard on his eleventh birthday and is swept off to Hogwarts, where his real story begins. The book that started it all.",
    available: "sale", price: null, color: "#7a2e2e"
  },
  {
    id: "hp-order-phoenix", title: "Harry Potter and the Order of the Phoenix", author: "J.K. Rowling",
    genres: ["Fantasy", "Adventure", "Young adult"],
    moods: ["dark", "adventurous", "emotional"],
    blurb: "As the wizarding world refuses to believe Voldemort has returned, Harry forms a secret student group to learn to defend themselves, in the longest and darkest book of the series so far.",
    available: "sale", price: null, color: "#1c2340"
  },
  {
    id: "hp-half-blood-prince", title: "Harry Potter and the Half-Blood Prince", author: "J.K. Rowling",
    genres: ["Fantasy", "Adventure", "Young adult"],
    moods: ["dark", "mysterious", "emotional"],
    blurb: "Harry gets private lessons from Dumbledore digging into Voldemort's past, while a mysterious used potions textbook changes how he sees everything else.",
    available: "sale", price: null, color: "#1f3a24"
  },
  {
    id: "hp-deathly-hallows", title: "Harry Potter and the Deathly Hallows", author: "J.K. Rowling",
    genres: ["Fantasy", "Adventure", "Young adult"],
    moods: ["epic", "emotional", "dark"],
    blurb: "Harry, Ron, and Hermione abandon Hogwarts to hunt down Voldemort's remaining Horcruxes, in the final, highest-stakes book of the series.",
    available: "sale", price: null, color: "#b5451f"
  },
  {
    id: "girl-hornets-nest", title: "The Girl Who Kicked the Hornet's Nest", author: "Stieg Larsson",
    genres: ["Thriller", "Crime", "Translated"],
    moods: ["dark", "suspenseful", "gripping"],
    blurb: "Recovering in a hospital bed and facing trial, hacker Lisbeth Salander fights back against the corrupt officials who have hunted her for years. The third Millennium novel.",
    available: "sale", price: null, color: "#c7c9cc"
  },
  {
    id: "girl-spiders-web", title: "The Girl in the Spider's Web", author: "David Lagercrantz",
    genres: ["Thriller", "Crime", "Translated"],
    moods: ["dark", "suspenseful", "fast-paced"],
    blurb: "Lisbeth Salander and journalist Mikael Blomkvist return in this continuation of Stieg Larsson's Millennium series, hacking into a web of secrets to protect a scientist's son.",
    available: "sale", price: null, color: "#3a0f0f"
  },
  {
    id: "nesbo-redeemer", title: "The Redeemer", author: "Jo Nesbø",
    genres: ["Thriller", "Crime", "Nordic noir"],
    moods: ["dark", "suspenseful", "gripping"],
    blurb: "A hired killer murders the wrong man at a Salvation Army Christmas concert in Oslo, and detective Harry Hole must find him before he corrects his mistake.",
    available: "read", price: null, color: "#0d0d0d"
  },
  {
    id: "nesbo-phantom", title: "Phantom", author: "Jo Nesbø",
    genres: ["Thriller", "Crime", "Nordic noir"],
    moods: ["dark", "gritty", "emotional"],
    blurb: "Harry Hole returns to Oslo's drug underworld to clear the son of the woman he loves of a murder charge, and finds the city changed by a dangerous new drug.",
    available: "read", price: null, color: "#101010"
  },
  {
    id: "nesbo-leopard", title: "The Leopard", author: "Jo Nesbø",
    genres: ["Thriller", "Crime", "Nordic noir"],
    moods: ["dark", "suspenseful", "intense"],
    blurb: "Pulled back from self-imposed exile, Harry Hole hunts a serial killer using a uniquely brutal murder weapon, in one of the darkest entries in the series.",
    available: "read", price: null, color: "#121212"
  },
  {
    id: "nesbo-son", title: "The Son", author: "Jo Nesbø",
    genres: ["Thriller", "Crime", "Nordic noir"],
    moods: ["dark", "intense", "redemptive"],
    blurb: "A young man raised inside a prison-run drug program breaks out on a mission of vengeance after learning the truth behind his father's death.",
    available: "read", price: null, color: "#141414"
  },
  {
    id: "nesbo-macbeth", title: "Macbeth", author: "Jo Nesbø",
    genres: ["Thriller", "Crime", "Retelling"],
    moods: ["dark", "violent", "ambitious"],
    blurb: "Nesbø reimagines Shakespeare's tragedy as a noir crime drama in a corrupt 1970s industrial town, where a police inspector's ambition curdles into bloodshed.",
    available: "read", price: null, color: "#8a1414"
  },
  {
    id: "mhc-just-take-my-heart", title: "Just Take My Heart", author: "Mary Higgins Clark",
    genres: ["Mystery", "Suspense"],
    moods: ["suspenseful", "twisty"],
    blurb: "A prosecutor investigating a high-profile murder starts receiving threats connected to the heart transplant that saved her life years earlier.",
    available: "read", price: null, color: "#7a1f2a"
  },
  {
    id: "dead-as-doornail", title: "Dead as a Doornail", author: "Charlaine Harris",
    genres: ["Fantasy", "Mystery", "Paranormal romance"],
    moods: ["fun", "suspenseful", "quirky"],
    blurb: "Telepathic waitress Sookie Stackhouse investigates a string of shapeshifter shootings in her small Louisiana town, in this Southern Vampire Mysteries novel.",
    available: "read", price: null, color: "#6b1620"
  },
  {
    id: "two-for-the-dough", title: "Two for the Dough", author: "Janet Evanovich",
    genres: ["Mystery", "Humor"],
    moods: ["funny", "fast-paced", "quirky"],
    blurb: "Bounty hunter Stephanie Plum chases down a former high school sweetheart turned funeral-home suspect, in this comic mystery series.",
    available: "read", price: null, color: "#c9a227"
  },
  {
    id: "high-five", title: "High Five", author: "Janet Evanovich",
    genres: ["Mystery", "Humor"],
    moods: ["funny", "fast-paced"],
    blurb: "Stephanie Plum investigates her uncle's sudden disappearance while juggling bounty-hunting chaos and her complicated love life.",
    available: "read", price: null, color: "#c2272a"
  },
  {
    id: "four-to-score", title: "Four to Score", author: "Janet Evanovich",
    genres: ["Mystery", "Humor"],
    moods: ["funny", "chaotic", "fast-paced"],
    blurb: "Stephanie Plum tracks down a skipped-bail waitress while dodging a stalker and the usual Trenton mayhem.",
    available: "read", price: null, color: "#e0c23a"
  },
  {
    id: "ten-big-ones", title: "Ten Big Ones", author: "Janet Evanovich",
    genres: ["Mystery", "Humor"],
    moods: ["funny", "fast-paced", "chaotic"],
    blurb: "After witnessing a robbery, Stephanie Plum ends up on a gang's hit list, upending her already chaotic life even further.",
    available: "read", price: null, color: "#1f4fa0"
  },
  {
    id: "womans-place", title: "A Woman's Place", author: "Barbara Delinsky",
    genres: ["Women's fiction", "Family drama"],
    moods: ["emotional", "reflective"],
    blurb: "Three women, each bound to the same man's betrayal, rebuild their sense of identity and independence in the aftermath.",
    available: "read", price: null, color: "#2a4a6b"
  },
  {
    id: "forgiving-delinsky", title: "Forgiving", author: "Barbara Delinsky",
    genres: ["Women's fiction", "Family drama"],
    moods: ["emotional", "healing", "reflective"],
    blurb: "A successful woman returns to her hometown and confronts old wounds with her estranged, difficult mother.",
    available: "read", price: null, color: "#6b4a3a"
  },
  {
    id: "dark-tort", title: "Dark Tort", author: "Diane Mott Davidson",
    genres: ["Mystery", "Culinary"],
    moods: ["cozy mystery", "suspenseful", "light"],
    blurb: "Caterer Goldy Schulz stumbles onto a murder at a law firm she's catering for, in this cozy culinary mystery series full of recipes and small-town gossip.",
    available: "read", price: null, color: "#e8c08a"
  },
  {
    id: "the-temptress", title: "The Temptress", author: "Jude Deveraux",
    genres: ["Romance", "Historical"],
    moods: ["romantic", "dramatic"],
    blurb: "A historical romance following an ambitious woman navigating scandal, status, and love in a world determined to keep her in her place.",
    available: "read", price: null, color: "#1a2e1a"
  },
  {
    id: "kill-the-messenger", title: "Kill the Messenger", author: "Tami Hoag",
    genres: ["Thriller", "Crime"],
    moods: ["suspenseful", "dark", "fast-paced"],
    blurb: "A bike messenger stumbles onto evidence of a crime and becomes the target of a ruthless cover-up on the streets of Los Angeles.",
    available: "read", price: null, color: "#8a1f1f"
  },
  {
    id: "sabotaged-haddix", title: "Sabotaged", author: "Margaret Peterson Haddix",
    genres: ["Young adult", "Mystery", "Science fiction"],
    moods: ["suspenseful", "fast-paced"],
    blurb: "Part of The Missing series: two kids who learn they were pulled out of history must fix a dangerous disruption in time, this one tangled up with the lost Roanoke colony.",
    available: "read", price: null, color: "#6b1620"
  },
  {
    id: "thirst-pike", title: "Thirst (Volumes 1 & 2)", author: "Christopher Pike",
    genres: ["Young adult", "Horror", "Fantasy"],
    moods: ["dark", "suspenseful", "vampiric"],
    blurb: "Omnibus volumes collecting Christopher Pike's classic YA vampire series, following Sita, an ancient vampire, across centuries of love and bloodshed.",
    available: "read", price: null, color: "#101010"
  },
  {
    id: "a-better-man", title: "A Better Man", author: "Louise Penny",
    genres: ["Mystery", "Crime"],
    moods: ["atmospheric", "thoughtful", "suspenseful"],
    blurb: "Chief Inspector Armand Gamache investigates a missing-persons case as a flood crisis rises around a small Quebec village, in this literary mystery series.",
    available: "read", price: null, color: "#3a4a6b"
  },
  {
    id: "husband-for-christmas", title: "A Husband for Christmas", author: "Diana Palmer",
    genres: ["Romance"],
    moods: ["romantic", "cozy", "heartwarming"],
    blurb: "A holiday romance where unexpected circumstances bring two people together just in time for Christmas.",
    available: "read", price: null, color: "#8a1a2a"
  },
  {
    id: "cat-who-covered-world", title: "The Cat Who Covered the World", author: "Christopher S. Wren",
    genres: ["Memoir", "Nonfiction", "Travel"],
    moods: ["heartwarming", "funny", "reflective"],
    blurb: "A foreign correspondent's memoir about the cat who traveled the globe with him through decades of reporting from conflict zones and foreign postings.",
    available: "read", price: null, color: "#3a5a6b"
  },
  {
    id: "step-toward-falling", title: "A Step Toward Falling", author: "Cammie McGovern",
    genres: ["Young adult", "Contemporary"],
    moods: ["emotional", "thoughtful", "redemptive"],
    blurb: "After failing to help a classmate with a disability, two teens are assigned community service together and are forced to confront their own assumptions about disability and belonging.",
    available: "read", price: null, color: "#9fc7b8"
  },
  {
    id: "casual-vacancy", title: "The Casual Vacancy", author: "J.K. Rowling",
    genres: ["Literary fiction", "Contemporary"],
    moods: ["dark", "satirical", "serious"],
    blurb: "Rowling's first adult novel is a sharp, dark look at class conflict and buried secrets in a small English town after a local council seat is unexpectedly vacated.",
    available: "read", price: null, color: "#c2272a"
  }
];
