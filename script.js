//Initialize questions to hold our questions, choices, and answers

const questions = [
  {
    question: "In HTML, what tag creates a paragraph?",
    choices: ["<p>", "<par>", "<paragraph>", "<a>"],
    answer: "<p>"
  },

  {
    question: "In CSS, how do we add a media query?",
    choices: ["$media", ".media", "#media", "@media"],
    answer: "@media"
  },
  {
    question: "Which of the following is NOT a common datatype?",
    choices: ["string", "numbers", "boolean", "alerts"],
    answer: "alerts"
  },
  {
    question: "Which of the following is NOT a way to define a variable?",
    choices: ["var", "int", "let", "const"],
    answer: "int"
  }
];

//Initializing our variables

const initTime = 75;
let time = 0;
let score = 0;
let count = 0;
let questionCount = 0;
let indexOfQuestion = 0;

//Initialize our selectors

let displayTimeEl = document.getElementById("spanTime");

let introEl = document.getElementById("intro");
let quizEl = document.getElementById("quiz");
let quizEndEl = document.getElementById("quizEnd");

let questionTitleEl = document.getElementById("showQuestion");
let choicesEl = document.getElementById("choices");

//Initialize Buttons

let startButton = document.getElementById("start");
let highScoreButton = document.getElementById("viewHighScore");
let goBackButton = document.getElementById("reset");
let clearButton = document.getElementById("clear");
let submitButton = document.getElementById("submit");

addEventListener("load", function() {
  introEl.style.display = "block";
  quizEl.style.display = "none";
  quizEndEl.style.display = "none";
});

function startQuiz() {
  time = initTime;
  console.log("test");
  introEl.style.display = "none";
  quizEl.style.display = "block";

  getQuestion();
  interval = setInterval(function() {
    time = time - 1;
    displayTimeEl.innerHTML = time;
    if (time <= 0) {
      displayTimeEl.innerHTML = 0;
      endQuiz();
    }
  }, 1000);
}

function getQuestion() {
  questionCount = questions[indexOfQuestion];
  questionTitleEl.textContent = questionCount.question;
  choicesEl.innerHTML = "";
  questionCount.choices.forEach(function(choice, i) {
    let button = document.createElement("button");
    button.setAttribute("value", choice);
    button.textContent = choice;
    button.onclick = questionClick;
    choicesEl.appendChild(button);
  });
}

function questionClick() {
  if (this.value !== questions[indexOfQuestion].answer) {
    alert("Wrong Answer");
    time = time - 10;
  } else {
    alert("Right Answer");
    score = score + 1;
  }
  indexOfQuestion++;
  if (indexOfQuestion === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

function endQuiz() {
  clearInterval(interval);
  introEl.style.display = "none";
  quizEl.style.display = "none";
  quizEndEl.style.display = "block";
}

function saveHighScore() {
  let initials = document.getElementById("initials").value;
  let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
  let currentScore = {
    score: score,
    intials: initials
  };
  highScores.push(currentScore);
  window.localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.href = "highscore.html";
}

function highScore() {
  window.location.href = "highscore.html";
}

function reset() {
  clearInterval(interval);
  introEl.style.display = block;
  time = 0;
  score = 0;
  questionCount = 0;
}

startButton.addEventListener("click", startQuiz);
highScoreButton.addEventListener("click", highScore);
goBackButton.addEventListener("click", reset);
submitButton.addEventListener("click", saveHighScore);
