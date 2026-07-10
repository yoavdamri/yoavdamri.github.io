const categories = [
  { id: "short", label: "Short", description: "A collection of quick stories and gentle reading" },
  { id: "technology", label: "Technology", description: "Stories about how modern inventions work" }
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
    },
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
    },
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
  ],
  technology: [
    {
      id: "radio",
      emoji: "📻",
      title: "How Radio Works",
      blurb: "A simple guide to invisible waves and listening to sound.",
      rows: [
        "Radio begins when a voice reaches a microphone and turns into an electrical signal.",
        "That signal is carried into a transmitter, where it is changed into a radio wave.",
        "The radio wave travels through the air at a very high speed.",
        "A receiver picks up the wave with its antenna and captures the pattern of the signal.",
        "Then the receiver changes the pattern back into sound.",
        "This is why a person can hear music, news, or stories from far away.",
        "The process depends on invisible energy moving through space.",
        "The transmitter and receiver must be tuned to the same frequency.",
        "When they match, the message can travel clearly and smoothly.",
        "That is the secret behind every radio station and every broadcast.",
        "Radio waves can cross cities, mountains, and oceans with amazing speed.",
        "People once used radio to learn about the world during difficult times.",
        "Today radio still helps families, drivers, and travelers stay informed.",
        "A simple radio set can turn tiny electric signals into warm voices.",
        "That makes radio one of the oldest and most useful inventions in technology.",
        "Even in a modern world, radio remains a quiet and powerful helper.",
        "It brings comfort, news, and music to millions of people every day.",
        "The magic is not only in the machine, but also in the invisible wave.",
        "Radio shows how science can turn air into a path for communication.",
        "It is a wonderful example of how clever ideas can change daily life."
      ]
    },
    {
      id: "television",
      emoji: "📺",
      title: "How Television Works",
      blurb: "A story about light, sound, and moving pictures.",
      rows: [
        "Television begins when a camera captures light from a scene and changes it into electrical signals.",
        "The camera turns the bright and dark parts of an image into tiny pieces of information.",
        "Those pieces travel through wires or wireless systems to a television set.",
        "Inside the screen, tiny dots of light glow in different colors.",
        "The dots are arranged so quickly that the eye sees a full picture.",
        "At the same time, the sound of the scene is sent as another signal.",
        "The speaker turns that signal back into voices, music, and effects.",
        "This is why a television can show both moving images and sound together.",
        "Modern televisions use digital signals, which are more clear and accurate.",
        "The images are refreshed many times each second so they appear smooth.",
        "A television is really a small and clever combination of light, electricity, and mathematics.",
        "Engineers designed it so people could watch stories from their own homes.",
        "It brought families together around a glowing screen.",
        "Over time, televisions became thinner, brighter, and smarter.",
        "Now they can connect to the internet and show streaming content.",
        "Even with new devices, television still plays a strong role in culture.",
        "It can teach, entertain, and connect communities across great distances.",
        "The secret of television is that it turns light and sound into a living illusion.",
        "That illusion feels real because the brain accepts it as motion and emotion.",
        "Television is one of the most powerful ways people share stories."
      ]
    },
    {
      id: "laser",
      emoji: "🔦",
      title: "How a Laser Works",
      blurb: "A bright beam that begins with light and energy.",
      rows: [
        "A laser starts with a material that can be energized by electricity or light.",
        "When that material is excited, its atoms reach a higher state of energy.",
        "The atoms then release light particles called photons.",
        "Inside the laser, mirrors help guide the photons in one direction.",
        "The light is made to move in a very organized pattern.",
        "That is why a laser beam looks narrow and powerful.",
        "Unlike ordinary light, laser light is steady and focused.",
        "It can travel long distances without spreading too much.",
        "This makes lasers useful for cutting, measuring, and sending signals.",
        "Doctors use lasers for surgery, and engineers use them for precision work.",
        "Scientists also use lasers to study tiny particles and distant stars.",
        "A barcode scanner uses a laser to read labels quickly and accurately.",
        "A laser pointer can mark a location on a screen with a bright dot.",
        "The beam is so focused that it can perform delicate tasks with care.",
        "The word laser comes from a description of how the light is produced.",
        "It is a tool that turns energy into a very controlled stream of light.",
        "That control is what makes the laser so special.",
        "It is both precise and powerful, which is why it appears in so many fields.",
        "From factories to hospitals, lasers help people work with great accuracy.",
        "The beam seems simple, but its science is deeply elegant."
      ]
    },
    {
      id: "electricity",
      emoji: "💡",
      title: "How Electricity Is Produced",
      blurb: "A story about energy moving from nature to homes.",
      rows: [
        "Electricity is produced when energy is changed into a flow of charged particles.",
        "Power plants use many kinds of energy sources to begin this process.",
        "Some plants burn fuel to heat water and create steam.",
        "The steam spins a turbine, and the turbine turns a generator.",
        "The generator uses magnets and coils to create electric current.",
        "Other plants use moving water from a dam to spin the turbine.",
        "Wind farms use large blades to capture moving air and make rotation.",
        "Solar panels turn sunlight directly into electrical energy.",
        "Nuclear plants release heat from splitting atoms to make steam.",
        "Each method is different, but the goal is the same.",
        "The generated electricity then travels through cables to homes and schools.",
        "Transformers help raise or lower the voltage for safe transport.",
        "The flow of electricity can power lights, computers, and appliances.",
        "It also keeps hospitals, trains, and communication towers running.",
        "People depend on electricity every hour of the day.",
        "That is why energy production is such an important part of modern life.",
        "Engineers work hard to make the process reliable and efficient.",
        "They also search for cleaner ways to create power.",
        "A future with better energy could protect the planet and improve living standards.",
        "Electricity is a quiet force, but it shapes almost everything people do."
      ]
    },
    {
      id: "satellite",
      emoji: "🛰️",
      title: "How Satellites Help People",
      blurb: "A story about orbiting machines and everyday usefulness.",
      rows: [
        "Satellites are machines that travel around Earth above the clouds.",
        "They carry instruments that can observe the planet from space.",
        "Some satellites help weather forecasters track storms and rain.",
        "Others help people find directions with global positioning systems.",
        "Communication satellites carry phone calls and television signals across continents.",
        "They can connect places that are far apart and hard to reach.",
        "Scientists use satellites to study forests, oceans, and ice.",
        "They can notice changes that happen over weeks or years.",
        "This information helps leaders make better choices for the environment.",
        "Satellites also support rescue teams during emergencies and disasters.",
        "They can help map roads, rivers, and damaged areas quickly.",
        "A small satellite can carry powerful tools for observation and sensing.",
        "The technology is complex, but the purpose is simple and human.",
        "It helps people stay informed, safe, and connected.",
        "Many modern services rely on satellites without most people noticing.",
        "When a map app gives directions, a satellite may be helping behind the scenes.",
        "When a storm warning arrives, satellites may have gathered the first clues.",
        "They are a reminder that technology can reach far beyond the ground.",
        "In a sense, satellites bring the whole world closer together."
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
  mind: "מוח",
  radio: "רדיו",
  begins: "מתחיל",
  voice: "קול",
  reaches: "מגיע",
  microphone: "מיקרופון",
  turns: "הופך",
  into: "ל",
  electrical: "חשמלי",
  signal: "אות",
  carried: "נישא",
  transmitter: "משדר",
  changed: "השתנה",
  travels: "נוסע",
  through: "דרך",
  air: "אוויר",
  high: "גבוה",
  speed: "מהירות",
  receiver: "מקלט",
  antenna: "אנטנה",
  captures: "לוכד",
  pattern: "דפוס",
  back: "חזרה",
  sound: "קול",
  why: "למה",
  person: "אדם",
  hear: "לשמוע",
  music: "מוזיקה",
  news: "חדשות",
  stories: "סיפורים",
  away: "הרחק",
  depends: "תלוי",
  invisible: "בלתי נראה",
  energy: "אנרגיה",
  space: "חלל",
  tuned: "מכוון",
  frequency: "תדר",
  match: "מתאים",
  clearly: "בבהירות",
  smoothly: "בחלקות",
  station: "תחנה",
  broadcast: "שידור",
  cross: "חוצה",
  cities: "ערים",
  mountains: "הרים",
  oceans: "אוקיינוסים",
  amazing: "מדהים",
  once: "פעם",
  learn: "ללמוד",
  world: "עולם",
  difficult: "קשה",
  times: "זמנים",
  today: "היום",
  still: "עדיין",
  helps: "עוזר",
  families: "משפחות",
  drivers: "נהגים",
  travelers: "נוסעים",
  stay: "להישאר",
  informed: "מעודכן",
  set: "מכשיר",
  electric: "חשמלי",
  signals: "אותות",
  voices: "קולות",
  oldest: "העתיק ביותר",
  useful: "שימושי",
  inventions: "המצאות",
  modern: "מודרני",
  remains: "נשאר",
  powerful: "עוצמתי",
  helper: "עוזר",
  comfort: "נוחות",
  brings: "מביא",
  millions: "מיליונים",
  people: "אנשים",
  day: "יום",
  magic: "קסם",
  machine: "מכונה",
  but: "אבל",
  also: "גם",
  science: "מדע",
  turn: "להפוך",
  path: "נתיב",
  communication: "תקשורת",
  wonderful: "מדהים",
  example: "דוגמה",
  clever: "חכם",
  ideas: "רעיונות",
  change: "לשנות",
  daily: "יומי",
  life: "חיים",
  television: "טלוויזיה",
  camera: "מצלמה",
  scene: "סצנה",
  changes: "משנה",
  pieces: "חתיכות",
  information: "מידע",
  travel: "לטייל",
  wires: "כבלים",
  wireless: "אלחוטי",
  systems: "מערכות",
  screen: "מסך",
  dots: "נקודות",
  colors: "צבעים",
  arranged: "מסודר",
  quickly: "במהירות",
  eye: "עין",
  sees: "רואה",
  picture: "תמונה",
  another: "אחר",
  speaker: "רמקול",
  effects: "אפקטים",
  together: "יחד",
  use: "משתמש",
  digital: "דיגיטלי",
  more: "יותר",
  clear: "בהיר",
  accurate: "מדויק",
  refreshed: "מתעדכן",
  second: "שנייה",
  appear: "להופיע",
  smooth: "חלק",
  really: "באמת",
  combination: "שילוב",
  mathematics: "מתמטיקה",
  engineers: "מהנדסים",
  designed: "נבנה",
  own: "של עצמו",
  homes: "בתים",
  around: "סביב",
  glowing: "מואר",
  over: "מעל",
  thinner: "דק יותר",
  brighter: "בהיר יותר",
  smarter: "חכם יותר",
  connect: "להתחבר",
  internet: "אינטרנט",
  streaming: "הזרמה",
  content: "תוכן",
  even: "אפילו",
  devices: "מכשירים",
  plays: "ממלא",
  role: "תפקיד",
  culture: "תרבות",
  teach: "ללמד",
  entertain: "להבדר",
  communities: "קהילות",
  across: "על פני",
  distances: "מרחקים",
  living: "חי",
  illusion: "אשליה",
  feels: "מרגיש",
  real: "אמיתי",
  because: "כי",
  brain: "מוח",
  accepts: "מקבל",
  motion: "תנועה",
  emotion: "רגש",
  ways: "דרכים",
  share: "לשתף",
  laser: "לייזר",
  material: "חומר",
  energized: "מופעל",
  excited: "מועורר",
  atoms: "אטומים",
  higher: "גבוה יותר",
  state: "מצב",
  release: "משחרר",
  particles: "חלקיקים",
  photons: "פוטונים",
  mirrors: "מראות",
  guide: "מנחה",
  direction: "כיוון",
  organized: "מאורגן",
  narrow: "צר",
  ordinary: "רגיל",
  steady: "יציב",
  focused: "ממוקד",
  spread: "להתפשט",
  much: "הרבה",
  cutting: "חיתוך",
  measuring: "מדידה",
  sending: "שליחה",
  surgery: "ניתוח",
  precision: "דיוק",
  study: "ללמוד",
  barcode: "ברקוד",
  scanner: "סורק",
  labels: "תוויות",
  accurately: "בדיוק",
  pointer: "מצביע",
  mark: "סמן",
  location: "מיקום",
  dot: "נקודה",
  delicate: "עדין",
  tasks: "משימות",
  care: "זהירות",
  comes: "בא",
  description: "תיאור",
  produced: "מופק",
  tool: "כלי",
  controlled: "מבוקר",
  stream: "זרם",
  special: "מיוחד",
  appears: "מופיע",
  fields: "תחומים",
  factories: "מפעלים",
  hospitals: "בתי חולים",
  accuracy: "דיוק",
  seems: "נראה",
  deeply: "עמוקות",
  elegant: "אלגנטי",
  electricity: "חשמל",
  charged: "טעון",
  sources: "מקורות",
  begin: "להתחיל",
  process: "תהליך",
  burn: "לשרוף",
  fuel: "דלק",
  heat: "חום",
  create: "ליצור",
  steam: "קיטור",
  spins: "מסובב",
  turbine: "טורבינה",
  generator: "גנרטור",
  magnets: "מגנטים",
  coils: "סלילים",
  current: "זרם",
  dam: "סכר",
  rotation: "סיבוב",
  panels: "לוחות",
  sunlight: "אור שמש",
  directly: "ישירות",
  nuclear: "גרעיני",
  splitting: "פיצול",
n  generated: "מופק",
  cables: "כבלים",
  schools: "בתי ספר",
  transformers: "שנאים",
  raise: "להעלות",
  lower: "להוריד",
  voltage: "מתח",
  transport: "הובלה",
  power: "כוח",
  appliances: "מכשירים",
  keeps: "שומר",
  trains: "רכבות",
  towers: "מגדלים",
  running: "פועל",
  hour: "שעה",
  important: "חשוב",
  part: "חלק",
  reliable: "אמין",
  efficient: "יעיל",
  search: "מחפש",
  cleaner: "נקי יותר",
  better: "טוב יותר",
  protect: "להגן",
  planet: "כוכב לכת",
  improve: "לשפר",
  standards: "סטנדרטים",
  force: "כוח",
  shapes: "יוצר",
  almost: "כמעט",
  everything: "הכל",
  satellites: "לוויינים",
  earth: "כדור הארץ",
  clouds: "עננים",
  carry: "נושאים",
  instruments: "כלים",
  observe: "להתבונן",
  weather: "מזג אוויר",
  forecasters: "חזאים",
  track: "לעקוב",
  storms: "סופות",
  others: "אחרים",
  directions: "כיוונים",
  global: "גלובלי",
  positioning: "מיקומים",
  phone: "טלפון",
  calls: "שיחות",
  continents: "יבשות",
  places: "מקומות",
  apart: "בנפרד",
  reach: "להגיע",
  scientists: "מדענים",
  forests: "יערות",
  ice: "קרח",
  notice: "להבחין",
  happen: "קורים",
  weeks: "שבועות",
  years: "שנים",
  leaders: "מנהיגים",
  choices: "בחירות",
  environment: "סביבה",
  support: "לתמוך",
  rescue: "הצלה",
  teams: "צוותים",
  emergencies: "חריגות",
  disasters: "אסונות",
  roads: "דרכים",
  rivers: "נהרות",
  damaged: "פגועים",
  areas: "אזורים",
  warning: "אזהרה",
  arrived: "הגיע",
  gathered: "אסף",
  first: "ראשון",
  clues: "רמזים",
  reminder: "תזכורת",
  whole: "הכול",
  closer: "יותר קרוב",
  app: "יישום",
  noticing: "שמתבוננים"
};

const bookList = document.getElementById("bookList");
const readerPane = document.getElementById("readerPane");
const categoryTabs = document.getElementById("categoryTabs");
const installButton = document.getElementById("installButton");

let activeCategory = "short";
let activeBookId = null;
let deferredInstallPrompt = null;

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

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installButton) {
    installButton.hidden = false;
  }
});

installButton?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  if (choice.outcome === "accepted") {
    installButton.hidden = true;
  }
  deferredInstallPrompt = null;
});

window.addEventListener("appinstalled", () => {
  if (installButton) {
    installButton.hidden = true;
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

renderCategoryTabs();
renderBookList();
openBook(getActiveBooks()[0].id);
