const userAnswers = [];
// added variable for question index
let questionIndex = 0;
// added variable for time left
let timeLeft = 60;
// added variable for score
let score = 0;
// added variable for timer
let timer;

// added variables for DOM elements
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const timerEl = document.getElementById("time");
const gameOverEl = document.getElementById("game-over");
const initialsEl = document.getElementById("initials");

// added function to update timer,
function startGame() {
  document.getElementById("startButton").style.display = "none";
  timer = setInterval(updateTimer, 1000);
  showQuestion();
}

// Function to show question, has a conditional to check if there are more questions, else end the game
function showQuestion() {
  const sections = document.querySelectorAll("section[class^='quiz']");
  const currentSection = sections[questionIndex];

  if (currentSection) {
    // Hide all sections
    sections.forEach((section) => {
      section.style.display = "none";
    });

    // Show the current section
    currentSection.style.display = "block";

    // Update the question and answers
    const questionEl = currentSection.querySelector("h1");
    const answerEl = currentSection.querySelector("ol");

    const currentQuestion = questions[questionIndex];
    questionEl.textContent = currentQuestion.question;
    answerEl.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.value = answer;
      button.onclick = answerQuestion;
      answerEl.appendChild(button);
    });
  } else {
    endGame();
  }
}

//Select answer, check if correct, update score, update question index, show next question
function answerQuestion(event) {
  const selectedAnswer = event.target.value;
  const currentQuestion = questions[questionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
  } else {
    timeLeft -= 10;
  }
  questionIndex++;
  showQuestion();
}
//Update timer, and check if time is up
function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if (timeLeft <= 0 || questionIndex >= questions.length) {
    endGame();
  }
}

//End game, show game over screen, show score
function endGame() {
  clearInterval(timer);
  timerEl.style.display = "none";
  gameOverEl.style.display = "block";
  document.getElementById("score").textContent = score;
}

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("save").addEventListener("click", saveScore);

function saveScore() {
  const initials = initialsEl.value;
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ initials, score });
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.href = "highscores.html";
}
