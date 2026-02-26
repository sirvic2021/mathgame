let correctAnswer;
let cor_ans = "?";
let completedTasks = 0; // ← счётчик правильных заданий

function newTask() {
  let a, b, operation;

  // Сбрасываем знак вопроса для нового примера
  cor_ans = "?";

  // генерируем пример, пока ответ не будет от 0 до 10
  do {
    a = Math.floor(Math.random() * 11);
    b = Math.floor(Math.random() * 11);
    operation = Math.random() > 0.5 ? "+" : "-";
    correctAnswer = operation === "+" ? a + b : a - b;
  } while (correctAnswer < 0 || correctAnswer > 10);
  

  document.getElementById("task").textContent = `${a} ${operation} ${b} = ${cor_ans}`;

  // создаём варианты ответов
  let answers = new Set();
  answers.add(correctAnswer);

  while (answers.size < 3) {
    const candidate = Math.floor(Math.random() * 11);
    answers.add(candidate);
  }

  answers = shuffle([...answers]);

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(ans, btn);
    answersDiv.appendChild(btn);
  });

  // сброс результата и кнопок
  document.getElementById("result").textContent = "";
  document.querySelectorAll("#answers button").forEach(b => b.style.background = "#1df0ff");
  document.querySelectorAll("#answers button").forEach(b => b.disabled = false);
}

function checkAnswer(ans, btn) {
  const resultDiv = document.getElementById("result");
  const taskEl = document.getElementById("task");

  if (ans === correctAnswer) {

    // --- ПРАВИЛЬНЫЙ ОТВЕТ ---
    btn.style.background = "#4CAF50";
    resultDiv.textContent = "МОЛОДЕЦ! 🎉";
    resultDiv.style.color = "#4CAF50";

    taskEl.textContent = taskEl.textContent.replace("?", correctAnswer);

    document.getElementById("correct-sound").play();

    cor_ans = ans;

    celebrateScreen();

    completedTasks++;

    // проверка КАЖДЫЕ 5 правильных
    if (completedTasks % 5 === 0) {
      setTimeout(() => {
        showCelebrationScreen();
      }, 800); // небольшая задержка после обычной анимации
    }

  } else {

    // --- НЕПРАВИЛЬНЫЙ ОТВЕТ ---
    btn.style.background = "#ff4d4d";
    resultDiv.textContent = "Попробуй ещё 😊";
    resultDiv.style.color = "#ff4d4d";

    document.getElementById("wrong-sound").play();
  }
}

// Анимация выигрыша на весь экран
function celebrateScreen() {
  // Вибрация
  if (navigator.vibrate) navigator.vibrate(200);

  // вспышка
  const flash = document.createElement("div");
  flash.className = "flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 400);

  // конфетти по всему экрану
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = Math.random() * 100 + "vh";
    confetti.style.background = ["#ff6b6b","#4ecdc4","#ffd93d","#6a4cff"][Math.floor(Math.random()*4)];
    confetti.style.animationDuration = (0.8 + Math.random()*0.7) + "s";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1500);
  }
}

// перемешивание Фишера-Йетса
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.getElementById("next").addEventListener("click", newTask);
cor_ans = "?";

newTask();

function showCelebrationScreen() {
  const screen = document.getElementById("celebration-screen");
  const applause = document.getElementById("applause-sound");

  screen.classList.remove("celebration-hidden");

  applause.currentTime = 0;
  applause.play();

  // Фейерверк
  for (let i = 0; i < 80; i++) {
    const fire = document.createElement("div");
    fire.className = "confetti";
    fire.style.left = Math.random() * 100 + "vw";
    fire.style.top = Math.random() * 100 + "vh";
    fire.style.background = ["#ff0000","#ffff00","#00ff00","#00ffff","#ff00ff"][Math.floor(Math.random()*5)];
    fire.style.animationDuration = (1 + Math.random()) + "s";
    document.body.appendChild(fire);
    setTimeout(() => fire.remove(), 2000);
  }

  // Авторазблокировка через 5 секунд
  setTimeout(() => {
    applause.pause();
  }, 5000);
}

function continueGame() {
  document.getElementById("celebration-screen").classList.add("celebration-hidden");
}