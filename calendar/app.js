const defaultSchedule = [
  { time: "07:00", title: "התעוררות וארוחת בוקר" },
  { time: "08:00", title: "יציאה לבית הספר" },
  { time: "12:30", title: "ארוחת צהריים" },
  { time: "15:00", title: "שעת קריאה" },
  { time: "18:00", title: "סיום היום ומשחק חופשי" },
  { time: "20:30", title: "שעת שקט והכנת צנצנת לילה" }
];

const STORAGE_KEY = "calendar-schedule-v1";

const scheduleList = document.getElementById("scheduleList");
const currentTimeEl = document.getElementById("currentTime");
const statusText = document.getElementById("statusText");
const nextTaskEl = document.getElementById("nextTask");
const startButton = document.getElementById("startButton");
const timeInput = document.getElementById("timeInput");
const titleInput = document.getElementById("titleInput");
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");
const editorHint = document.getElementById("editorHint");

let schedule = loadSchedule();
let notificationsEnabled = false;
let lastSpokenKey = null;
let editingIndex = null;

function loadSchedule() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Could not load saved schedule", error);
  }
  return defaultSchedule;
}

function saveSchedule() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
}

function sortSchedule() {
  schedule.sort((a, b) => a.time.localeCompare(b.time));
}

function resetEditor() {
  editingIndex = null;
  timeInput.value = "";
  titleInput.value = "";
  saveButton.textContent = "➕ הוסף משימה";
  editorHint.textContent = "לחץ על משימה לעריכה או מחיקה.";
}

function renderSchedule() {
  if (!schedule.length) {
    scheduleList.innerHTML = '<div class="schedule-item"><strong>אין משימות עדיין.</strong></div>';
    return;
  }

  scheduleList.innerHTML = schedule
    .map((item, index) => `
      <div class="schedule-item" data-time="${item.time}">
        <div class="item-main">
          <span class="time-pill">${item.time}</span>
          <strong>${item.title}</strong>
        </div>
        <div class="item-actions">
          <button class="icon-button edit" data-index="${index}">✏️</button>
          <button class="icon-button delete" data-index="${index}">🗑️</button>
        </div>
      </div>
    `)
    .join("");
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function updateClock() {
  const now = new Date();
  const current = formatTime(now);
  currentTimeEl.textContent = current;

  document.querySelectorAll(".schedule-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.time === current);
  });

  const nextTask = schedule.find((entry) => entry.time > current) || schedule[0];
  nextTaskEl.innerHTML = nextTask
    ? `<strong>המשימה הבאה:</strong><br />${nextTask.time} – ${nextTask.title}`
    : "אין משימות נוספות.";

  if (notificationsEnabled) {
    checkForReminder(current);
  }
}

function checkForReminder(current) {
  const matchingTask = schedule.find((entry) => entry.time === current);
  if (!matchingTask) return;

  const reminderKey = matchingTask.time;
  if (reminderKey === lastSpokenKey) return;

  lastSpokenKey = reminderKey;
  speakTitle(matchingTask.title);
}

function speakTitle(title) {
  if (!("speechSynthesis" in window)) return;

  speechSynthesis.cancel();
  const text = title;
  const firstUtterance = new SpeechSynthesisUtterance(text);
  firstUtterance.lang = "he-IL";
  firstUtterance.rate = 1;

  speechSynthesis.speak(firstUtterance);

  window.setTimeout(() => {
    const secondUtterance = new SpeechSynthesisUtterance(text);
    secondUtterance.lang = "he-IL";
    secondUtterance.rate = 1;
    speechSynthesis.speak(secondUtterance);
  }, 1000);
}

function handleSave() {
  const time = timeInput.value.trim();
  const title = titleInput.value.trim();

  if (!time || !title) {
    editorHint.textContent = "יש למלא גם שעה וגם כותרת.";
    return;
  }

  const normalizedTime = time.slice(0, 5);

  if (editingIndex !== null) {
    schedule[editingIndex] = { time: normalizedTime, title };
  } else {
    schedule.push({ time: normalizedTime, title });
  }

  sortSchedule();
  saveSchedule();
  renderSchedule();
  updateClock();
  resetEditor();
}

function handleDelete(index) {
  schedule.splice(index, 1);
  saveSchedule();
  if (editingIndex === index) {
    resetEditor();
  } else if (editingIndex !== null && editingIndex > index) {
    editingIndex -= 1;
  }
  renderSchedule();
  updateClock();
}

scheduleList.addEventListener("click", (event) => {
  const editButton = event.target.closest(".edit");
  const deleteButton = event.target.closest(".delete");

  if (editButton) {
    const index = Number(editButton.dataset.index);
    editingIndex = index;
    timeInput.value = schedule[index].time;
    titleInput.value = schedule[index].title;
    saveButton.textContent = "✏️ עדכן משימה";
    editorHint.textContent = `עורכים: ${schedule[index].title}`;
  }

  if (deleteButton) {
    const index = Number(deleteButton.dataset.index);
    handleDelete(index);
  }
});

saveButton.addEventListener("click", handleSave);
clearButton.addEventListener("click", resetEditor);

startButton.addEventListener("click", () => {
  notificationsEnabled = true;
  statusText.textContent = "המערכת פועלת. האפליקציה תקריא את המשימה כשיגיע הזמן.";
  startButton.textContent = "✅ המערכת פעילה";
  startButton.disabled = true;
  speakTitle("המערכת מוכנה לתזכורות");
});

resetEditor();
renderSchedule();
updateClock();
setInterval(updateClock, 1000);
