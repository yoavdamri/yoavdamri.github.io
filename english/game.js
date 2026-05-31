const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Get canvas dimensions from computed styles
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Game variables
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
let gameActive = true;
let eliminatedCount = 0;

// Player object
const player = {
  x: 400,
  y: 300,
  width: 30,
  height: 30,
  speed: 5,
  health: 100,
  maxHealth: 100,
  attackRange: 80,
  attackDamage: 50,
  lastAttack: 0,
  attackCooldown: 500,
};

// Enemy array
const enemies = [];

// Initialize enemies
function initEnemies() {
  enemies.length = 0;
  for (let i = 0; i < 10; i++) {
    let x, y;
    let valid = false;
    while (!valid) {
      x = Math.random() * (GAME_WIDTH - 60) + 30;
      y = Math.random() * (GAME_HEIGHT - 60) + 30;
      const dist = Math.sqrt(
        Math.pow(x - player.x, 2) + Math.pow(y - player.y, 2)
      );
      if (dist > 150) {
        valid = true;
      }
    }
    enemies.push({
      x: x,
      y: y,
      width: 28,
      height: 28,
      speed: 1.5 + Math.random() * 1.5,
      health: 50,
      maxHealth: 50,
      vx: 0,
      vy: 0,
      direction: Math.random() * Math.PI * 2,
      color: `hsl(${Math.random() * 60 + 10}, 100%, 50%)`,
      alive: true,
    });
  }
}

// Input handling
const keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;

  if (e.key === " ") {
    e.preventDefault();
    playerAttack();
  }
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Update player position
function updatePlayer() {
  const moveX =
    (keys["ArrowRight"] || keys["d"] ? 1 : 0) -
    (keys["ArrowLeft"] || keys["a"] ? 1 : 0);
  const moveY =
    (keys["ArrowDown"] || keys["s"] ? 1 : 0) -
    (keys["ArrowUp"] || keys["w"] ? 1 : 0);

  if (moveX !== 0 || moveY !== 0) {
    const length = Math.sqrt(moveX * moveX + moveY * moveY);
    player.x += (moveX / length) * player.speed;
    player.y += (moveY / length) * player.speed;
  }

  // Keep player in bounds
  player.x = Math.max(player.width / 2, Math.min(player.x, GAME_WIDTH - player.width / 2));
  player.y = Math.max(player.height / 2, Math.min(player.y, GAME_HEIGHT - player.height / 2));
}

// Player attack
function playerAttack() {
  const now = Date.now();
  if (now - player.lastAttack < player.attackCooldown) return;

  player.lastAttack = now;

  enemies.forEach((enemy) => {
    if (!enemy.alive) return;
    const dist = Math.sqrt(
      Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2)
    );
    if (dist < player.attackRange) {
      enemy.health -= player.attackDamage;
      if (enemy.health <= 0) {
        enemy.alive = false;
        eliminatedCount++;
        document.getElementById("eliminated").textContent = eliminatedCount;
        if (eliminatedCount >= 10) {
          endGameWin();
        }
      }
    }
  });
}

// Update enemies
function updateEnemies() {
  enemies.forEach((enemy) => {
    if (!enemy.alive) return;

    // Simple AI: move towards player
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      enemy.vx = (dx / distance) * enemy.speed;
      enemy.vy = (dy / distance) * enemy.speed;
    }

    enemy.x += enemy.vx;
    enemy.y += enemy.vy;

    // Keep enemy in bounds
    enemy.x = Math.max(enemy.width / 2, Math.min(enemy.x, GAME_WIDTH - enemy.width / 2));
    enemy.y = Math.max(enemy.height / 2, Math.min(enemy.y, GAME_HEIGHT - enemy.height / 2));

    // Check collision with player
    const collisionDist = (player.width + enemy.width) / 2;
    if (distance < collisionDist) {
      player.health -= 0.5;
      document.getElementById("health").textContent = Math.max(
        0,
        Math.floor(player.health)
      );
      if (player.health <= 0) {
        endGameOver();
      }
    }
  });
}

// Draw game
function draw() {
  // Clear canvas
  ctx.fillStyle = "rgba(135, 206, 235, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grass pattern
  ctx.fillStyle = "rgba(144, 238, 144, 0.3)";
  for (let i = 0; i < canvas.width; i += 40) {
    for (let j = 0; j < canvas.height; j += 40) {
      if ((i + j) % 80 === 0) {
        ctx.fillRect(i, j, 40, 40);
      }
    }
  }

  // Scale factor for drawing
  const scaleX = canvas.width / GAME_WIDTH;
  const scaleY = canvas.height / GAME_HEIGHT;

  // Draw enemies
  enemies.forEach((enemy) => {
    if (!enemy.alive) return;

    ctx.fillStyle = enemy.color;
    ctx.fillRect(
      enemy.x * scaleX - (enemy.width / 2) * scaleX,
      enemy.y * scaleY - (enemy.height / 2) * scaleY,
      enemy.width * scaleX,
      enemy.height * scaleY
    );

    // Enemy health bar
    const barWidth = 30 * scaleX;
    const barHeight = 4 * scaleY;
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(
      enemy.x * scaleX - barWidth / 2,
      (enemy.y - 25) * scaleY,
      barWidth,
      barHeight
    );

    const healthPercent = enemy.health / enemy.maxHealth;
    ctx.fillStyle = healthPercent > 0.3 ? "#00ff00" : "#ff0000";
    ctx.fillRect(
      enemy.x * scaleX - barWidth / 2,
      (enemy.y - 25) * scaleY,
      barWidth * healthPercent,
      barHeight
    );
  });

  // Draw player
  ctx.fillStyle = "#3498db";
  ctx.beginPath();
  ctx.arc(
    player.x * scaleX,
    player.y * scaleY,
    (player.width / 2) * scaleX,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Player border
  ctx.strokeStyle = "#2c3e50";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw attack range indicator
  if (Date.now() - player.lastAttack < 200) {
    ctx.strokeStyle = "rgba(255, 200, 0, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
      player.x * scaleX,
      player.y * scaleY,
      player.attackRange * scaleX,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }

  // Player health bar
  const playerBarWidth = 60 * scaleX;
  const playerBarHeight = 6 * scaleY;
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(
    player.x * scaleX - playerBarWidth / 2,
    (player.y - 50) * scaleY,
    playerBarWidth,
    playerBarHeight
  );

  const healthPercent = player.health / player.maxHealth;
  ctx.fillStyle = healthPercent > 0.3 ? "#00ff00" : "#ff0000";
  ctx.fillRect(
    player.x * scaleX - playerBarWidth / 2,
    (player.y - 50) * scaleY,
    playerBarWidth * healthPercent,
    playerBarHeight
  );
}

// Game loop
function gameLoop() {
  if (gameActive) {
    updatePlayer();
    updateEnemies();
    draw();
  }
  requestAnimationFrame(gameLoop);
}

// End game functions
function endGameWin() {
  gameActive = false;
  document.getElementById("winScreen").classList.remove("hidden");
}

function endGameOver() {
  gameActive = false;
  document.getElementById("finalEliminated").textContent = eliminatedCount;
  document.getElementById("gameOverScreen").classList.remove("hidden");
}

// Initialize and start game
initEnemies();
gameLoop();
