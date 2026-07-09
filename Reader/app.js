const categories = [
  { id: "short", label: "Short", description: "Tiny stories with easy words" },
  { id: "medium", label: "Medium", description: "A little longer and a little more challenging" },
  { id: "long", label: "Long", description: "Longer stories for steady readers" }
];

const booksByCategory = {
  short: [
    {
      id: "milo",
      emoji: "🌙",
      title: "Milo and the Moon",
      blurb: "A small boy meets a shining moon.",
      rows: [
        "Milo saw a silver moon above his window.",
        "The moon smiled and said, \"Hello, Milo.\"",
        "Milo waved and felt brave.",
        "They played softly until the stars blinked goodnight."
      ]
    },
    {
      id: "nina",
      emoji: "🎈",
      title: "Nina and the Red Balloon",
      blurb: "A happy girl chases a bright balloon.",
      rows: [
        "Nina held a red balloon in the park.",
        "The balloon danced in the wind.",
        "Nina laughed and ran after it.",
        "Soon the balloon rested by her hand."
      ]
    },
    {
      id: "ben",
      emoji: "🍎",
      title: "Ben and the Big Apple",
      blurb: "Ben finds a giant apple by the tree.",
      rows: [
        "Ben saw a big apple on the grass.",
        "It was round, red, and warm in the sun.",
        "Ben picked it up and smiled.",
        "He shared it with his friends at lunch."
      ]
    },
    {
      id: "pip",
      emoji: "🌧️",
      title: "Pip in the Rain",
      blurb: "A little duck loves the rainy day.",
      rows: [
        "Pip the duck liked the rain.",
        "Pitter-patter drops fell on his head.",
        "He splashed in the puddles with joy.",
        "Then he shook his wings and sang."
      ]
    },
    {
      id: "lulu",
      emoji: "🐦",
      title: "Lulu and the Little Bird",
      blurb: "A kind girl helps a tiny bird.",
      rows: [
        "Lulu found a little bird near the gate.",
        "The bird had a hurt wing.",
        "Lulu made a soft nest with grass.",
        "The bird slept and felt safe."
      ]
    },
    {
      id: "sam",
      emoji: "🏖️",
      title: "Sam and the Sand Castle",
      blurb: "Sam builds a castle by the sea.",
      rows: [
        "Sam made a sand castle by the sea.",
        "He used a small pail and a shovel.",
        "The castle had a tall tower.",
        "A wave came and gave it a kiss."
      ]
    },
    {
      id: "tia",
      emoji: "⭐",
      title: "Tia and the Tiny Star",
      blurb: "A girl finds a star that glows near home.",
      rows: [
        "Tia saw a tiny star near her house.",
        "It twinkled like a little lamp.",
        "Tia put it in a glass jar.",
        "The star shone all night long."
      ]
    },
    {
      id: "coco",
      emoji: "🛏️",
      title: "Coco and the Cozy Bed",
      blurb: "Coco curls up for a warm nap.",
      rows: [
        "Coco the cat found a cozy bed.",
        "It was soft and warm and blue.",
        "Coco curled up and closed her eyes.",
        "She dreamed of fish and sunbeams."
      ]
    },
    {
      id: "maya",
      emoji: "🐝",
      title: "Maya and the Busy Bees",
      blurb: "Maya watches bees gather honey.",
      rows: [
        "Maya saw busy bees near the flowers.",
        "They buzzed from bloom to bloom.",
        "Maya smiled and watched them work.",
        "Soon the bees flew home with honey."
      ]
    },
    {
      id: "leo",
      emoji: "⛵",
      title: "Leo and the Blue Boat",
      blurb: "Leo sails a bright blue boat.",
      rows: [
        "Leo took a blue boat to the lake.",
        "The water was calm and bright.",
        "Leo paddled with a small oar.",
        "He felt happy and free."
      ]
    }
  ],
  medium: [
    {
      id: "mina",
      emoji: "🗺️",
      title: "Mina and the Missing Map",
      blurb: "Mina looks for a map before the picnic.",
      rows: [
        "Mina woke up early and packed a lunch for the picnic.",
        "She looked for the map that was on the table.",
        "The map was missing, so Mina checked the kitchen and the porch.",
        "Then she found it under a blue hat near the gate.",
        "Mina smiled and ran to the green park with her friends."
      ]
    },
    {
      id: "theo",
      emoji: "🌱",
      title: "Theo's Small Garden",
      blurb: "Theo grows flowers and beans in a tiny garden.",
      rows: [
        "Theo had a small garden behind his house.",
        "He planted beans, sunflowers, and bright tomatoes.",
        "Every morning he watered the soil and watched the leaves.",
        "Soon the flowers opened and the beans climbed the fence.",
        "Theo felt proud when his garden looked happy and full."
      ]
    },
    {
      id: "rosa",
      emoji: "📦",
      title: "Rosa Finds a Secret Box",
      blurb: "Rosa opens a box and finds a surprise.",
      rows: [
        "Rosa found a small box under the old tree.",
        "The box had a secret lock and a tiny silver key.",
        "She carried it to the porch and opened it slowly.",
        "Inside was a note and a little ribbon with a star.",
        "Rosa laughed and kept the ribbon in her pocket."
      ]
    }
  ],
  long: [
    {
      id: "ari",
      emoji: "☁️",
      title: "Ari and the Cloud Caravan",
      blurb: "Ari follows a cloud caravan across the sky.",
      rows: [
        "Ari sat by the window and watched the clouds drift over the hills.",
        "He saw a long line of clouds moving slowly like a caravan.",
        "Each cloud carried tiny drops of rain and a soft silver light.",
        "Ari followed them with his eyes until they reached the far blue sky.",
        "Then the clouds turned and made a bright path for the evening sun.",
        "Ari smiled and closed his book, thinking about the long and gentle journey."
      ]
    },
    {
      id: "mara",
      emoji: "📚",
      title: "The Little Library on Maple Street",
      blurb: "A child visits a small library and finds new stories.",
      rows: [
        "On Maple Street there was a little library beside a red door.",
        "Every morning a girl named Mara walked there with a small bag.",
        "She liked the smell of paper, the quiet room, and the warm lamp.",
        "One day she found a book about a fox, a moon, and a hidden path.",
        "Mara read it slowly, and the words made her feel brave and curious.",
        "When she left, she carried a new story in her heart."
      ]
    },
    {
      id: "nora",
      emoji: "🏮",
      title: "Nora and the Night Lantern",
      blurb: "Nora lights a lantern and walks through the garden at dusk.",
      rows: [
        "Nora took a small lantern to the garden when the sky turned purple.",
        "She walked past the roses and the tall green beans.",
        "The lantern made a soft gold circle on the path.",
        "Nora saw a sleepy cat, a bright moth, and a tiny snail.",
        "The night felt calm and kind, and the lantern made the garden glow.",
        "When Nora went inside, she kept the warm light in her mind."
      ]
    }
  ]
};

const wordTranslations = {
  milo: "מילו",
  saw: "ראה",
  a: "א",
  silver: "כסוף",
  moon: "ירח",
  above: "מעל",
  his: "שלו",
  window: "חלון",
  the: "ה",
  smiled: "חייך",
  and: "ו",
  said: "אמר",
  hello: "שלום",
  waved: "נופף",
  felt: "הרגיש",
  brave: "אמיץ",
  they: "הם",
  played: "שיחקו",
  softly: "ברכות",
  until: "עד",
  stars: "כוכבים",
  blinked: "הבהבו",
  goodnight: "לילה טוב",
  nina: "נינה",
  held: "החזיקה",
  red: "אדום",
  balloon: "בלון",
  in: "ב",
  park: "פארק",
  danced: "רקד",
  wind: "רוח",
  laughed: "צחקה",
  ran: "רצה",
  after: "אחרי",
  it: "זה",
  soon: "בקרוב",
  rested: "נחה",
  by: "על ידי",
  hand: "יד",
  ben: "בן",
  big: "גדול",
  apple: "תפוח",
  on: "על",
  grass: "דשא",
  was: "היה",
  round: "עגול",
  warm: "חם",
  sun: "שמש",
  picked: "אסף",
  up: "למעלה",
  him: "אותו",
  shared: "שתף",
  with: "עם",
  friends: "חברים",
  at: "ב",
  lunch: "ארוחת צהריים",
  pip: "פיפ",
  duck: "ברווז",
  liked: "אהב",
  rain: "גשם",
  pitter: "פטפט",
  patter: "פטפט",
  drops: "טיפות",
  fell: "נפלו",
  head: "ראש",
  splashed: "הטיף",
  puddles: "בורות מים",
  joy: "שמחה",
  then: "אז",
  shook: "נענע",
  wings: "כנפיים",
  sang: "שר",
  lulu: "לולי",
  found: "מצאה",
  little: "קטנה",
  bird: "ציפור",
  near: "ליד",
  gate: "שער",
  had: "היה לה",
  hurt: "פצוע",
  wing: "כנף",
  made: "עשתה",
  soft: "רך",
  nest: "קן",
  slept: "ישנה",
  safe: "בטוח",
  sam: "סם",
  sand: "חול",
  castle: "טירה",
  sea: "ים",
  used: "השתמש",
  small: "קטן",
  pail: "דלי",
  shovel: "כלי חפירה",
  tower: "מגדל",
  wave: "גל",
  came: "בא",
  gave: "נתן",
  kiss: "נשיקה",
  tia: "טיה",
  tiny: "קטנה",
  star: "כוכב",
  house: "בית",
  twinkled: "ניצץ",
  like: "כמו",
  lamp: "מנורה",
  put: "הניחה",
  glass: "זכוכית",
  jar: "צנצנת",
  shone: "זהר",
  night: "לילה",
  long: "ארוך",
  coco: "קוקו",
  cat: "חתול",
  cozy: "נעים",
  bed: "מיטה",
  blue: "כחול",
  curled: "התכרבל",
  closed: "סגרה",
  eyes: "עיניים",
  dreamed: "חלמה",
  fish: "דגים",
  sunbeams: "קרני שמש",
  maya: "מיה",
  busy: "עסוקה",
  bees: "דבורים",
  flowers: "פרחים",
  buzzed: "רחרחו",
  bloom: "פרח",
  watch: "צפה",
  work: "עבודה",
  flew: "עפו",
  home: "בית",
  honey: "דבש",
  leo: "ליאו",
  took: "לקח",
  lake: "אגם",
  water: "מים",
  calm: "שקט",
  bright: "בהיר",
  paddled: "החליקה",
  oar: "מוט",
  free: "חופשי",
  mina: "מינה",
  missing: "חסר",
  map: "מפה",
  picnic: "פיקניק",
  looked: "הסתכלה",
  table: "שולחן",
  checked: "בדקה",
  kitchen: "מטבח",
  porch: "מרפסת",
  found: "מצאה",
  under: "מתחת",
  hat: "כובע",
  gate: "שער",
  friends: "חברים",
  theo: "תיאו",
  garden: "גן",
  behind: "מאחור",
  planted: "שתל",
  beans: "שעועית",
  sunflowers: "שמשונים",
  tomatoes: "עגבניות",
  every: "כל",
  morning: "בוקר",
  watered: "השקה",
  soil: "אדמה",
  watched: "צפה",
  leaves: "עלים",
  opened: "נפתח",
  climbed: "טיפס",
  fence: "גדר",
  proud: "גאה",
  full: "מלא",
  rosa: "רוזה",
  secret: "סודי",
  box: "קופסה",
  lock: "מנעול",
  tiny: "קטנה",
  silver: "כסף",
  key: "מפתח",
  carried: "החזיקה",
  porch: "מרפסת",
  slowly: "לאט",
  inside: "בפנים",
  note: "הערה",
  ribbon: "סרט",
  pocket: "כיס",
  ari: "ארי",
  cloud: "ענן",
  caravan: "שיירה",
  drift: "נסחף",
  hills: "גבעות",
  line: "שורה",
  moving: "זז",
  slowly: "לאט",
  each: "כל",
  carried: "החזיקה",
  drops: "טיפות",
  rain: "גשם",
  soft: "רך",
  light: "אור",
  followed: "עקבה",
  eyes: "עיניים",
  reached: "הגיעה",
  far: "רחוק",
  blue: "כחול",
  turned: "הסתובב",
  bright: "בהיר",
  path: "נתיב",
  evening: "ערב",
  sun: "שמש",
  closed: "סגרה",
  thinking: "מחשבה",
  journey: "מסע",
  mara: "מארה",
  library: "ספרייה",
  maple: "אדר",
  street: "רחוב",
  beside: "ליד",
  door: "דלת",
  every: "כל",
  bag: "תיק",
  smell: "ריח",
  paper: "נייר",
  room: "חדר",
  warm: "חם",
  lamp: "מנורה",
  found: "מצאה",
  fox: "שועל",
  moon: "ירח",
  hidden: "מוסתר",
  read: "קראה",
  words: "מילים",
  make: "לעשות",
  curious: "סקרן",
  heart: "לב",
  nora: "נורה",
  lantern: "פנס",
  garden: "גן",
  when: "כשה",
  sky: "שמים",
  purple: "סגול",
  walked: "הלכה",
  past: "עבר",
  roses: "ורדים",
  tall: "גבוה",
  green: "ירוק",
  beans: "שעועית",
  gold: "זהב",
  circle: "עיגול",
  path: "נתיב",
  sleepy: "ישנוני",
  cat: "חתול",
  moth: "עש",
  snail: "שבלול",
  night: "לילה",
  calm: "שקט",
  kind: "טוב",
  glow: "זוהר",
  went: "הלכה",
  inside: "בפנים",
  kept: "שמרה",
  warm: "חם",
  light: "אור",
  mind: "מוח"
};

const bookList = document.getElementById("bookList");
const readerPane = document.getElementById("readerPane");
const categoryTabs = document.getElementById("categoryTabs");

let activeCategory = "short";
let activeBookId = null;

function getActiveBooks() {
  return booksByCategory[activeCategory] || [];
}

function renderCategoryTabs() {
  categoryTabs.innerHTML = categories
    .map(
      (category) => `
        <button class="category-tab ${category.id === activeCategory ? "active" : ""}" data-category="${category.id}">
          ${category.label}
        </button>
      `
    )
    .join("");

  categoryTabs.querySelectorAll(".category-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      activeBookId = null;
      renderCategoryTabs();
      renderBookList();
      const firstBook = getActiveBooks()[0];
      if (firstBook) {
        openBook(firstBook.id);
      }
    });
  });
}

function renderBookList() {
  const books = getActiveBooks();
  bookList.innerHTML = books
    .map(
      (book) => `
        <button class="book-card ${book.id === activeBookId ? "active" : ""}" data-id="${book.id}">
          <span class="book-emoji">${book.emoji}</span>
          <span class="book-copy">
            <strong>${book.title}</strong>
            <small>${book.blurb}</small>
          </span>
        </button>
      `
    )
    .join("");

  bookList.querySelectorAll(".book-card").forEach((button) => {
    button.addEventListener("click", () => openBook(button.dataset.id));
  });
}

function renderWordSpans(text) {
  return text
    .split(/(\s+|[.,!?;:"'()])/)
    .map((part) => {
      if (!part || !part.trim()) return part;
      if (!/^[A-Za-z']+$/.test(part)) return part;

      const normalized = part.toLowerCase().replace(/[^a-z]/g, "");
      const translation = wordTranslations[normalized] || part;
      return `<span class="word" data-word="${part}" data-translation="${translation}">${part}</span>`;
    })
    .join("");
}

function openBook(bookId) {
  const books = getActiveBooks();
  const book = books.find((entry) => entry.id === bookId);
  if (!book) return;

  activeBookId = book.id;

  document.querySelectorAll(".book-card").forEach((button) => {
    button.classList.toggle("active", button.dataset.id === bookId);
  });

  const category = categories.find((entry) => entry.id === activeCategory);

  readerPane.innerHTML = `
    <div class="reader-top">
      <div>
        <p class="eyebrow">${category ? category.label : "Story"} stories</p>
        <h2>${book.title}</h2>
        <p>${book.blurb}</p>
      </div>
      <button class="ghost-button" id="readBookButton">🔊 Read whole book</button>
    </div>
    <div class="row-stack">
      ${book.rows
        .map(
          (row, index) => `
            <article class="row-card">
              <div class="row-head">
                <span class="row-number">Row ${index + 1}</span>
                <button class="play-button" data-row="${index}">🔊 Read this row</button>
              </div>
              <p class="row-text">${renderWordSpans(row)}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;

  readerPane.querySelectorAll(".play-button").forEach((button) => {
    button.addEventListener("click", () => {
      const row = book.rows[Number(button.dataset.row)];
      speakText(row);
    });
  });

  const readBookButton = document.getElementById("readBookButton");
  readBookButton.addEventListener("click", () => speakText(book.rows.join(" ")));

  readerPane.onclick = (event) => {
    const word = event.target.closest(".word");
    if (!word) return;

    event.stopPropagation();
    showTooltip(word, event.clientX, event.clientY);
  };
}

function showTooltip(word, x, y) {
  document.querySelectorAll(".word-tooltip").forEach((tooltip) => tooltip.remove());

  const tooltip = document.createElement("div");
  tooltip.className = "word-tooltip";
  tooltip.innerHTML = `<strong>${word.dataset.word}</strong><span>${word.dataset.translation}</span>`;
  document.body.appendChild(tooltip);

  const rect = tooltip.getBoundingClientRect();
  tooltip.style.left = `${x - rect.width / 2}px`;
  tooltip.style.top = `${y - rect.height - 10}px`;
}

function speakText(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".word")) {
    document.querySelectorAll(".word-tooltip").forEach((tooltip) => tooltip.remove());
  }
});

renderCategoryTabs();
renderBookList();
openBook(getActiveBooks()[0].id);
