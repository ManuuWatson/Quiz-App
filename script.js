const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0   // index of the correct option
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-color", "color", "text-color", "foreground"],
        answer: 1
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: 2
    },
    {
        question: "Which method adds an item to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Data Object Model",
            "Document Object Model",
            "Digital Ordered Map",
            "Display Object Management"
        ],
        answer: 1
    }
];

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const questionCount = document.getElementById("question-count");
const optionsBox = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreText = document.getElementById("score-text");
const progress = document.getElementById("progress");

let currentIndex = 0;
let score = 0;
let answered = false;

function showQuestion() {
  answered = false;
  nextBtn.disabled = true;

  const current = questions[currentIndex];
  questionCount.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  questionText.textContent = current.question;
  progress.style.width = `${(currentIndex / questions.length) * 100}%`;

  // Change button label on the last question
  nextBtn.textContent =
    currentIndex === questions.length - 1 ? "Submit" : "Next";

  optionsBox.innerHTML = "";
  current.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add("option");
    btn.addEventListener("click", () => selectAnswer(btn, index));
    optionsBox.appendChild(btn);
  });
}

function selectAnswer(selectedBtn, selectedIndex) {
  if (answered) return;       // prevent changing the answer
  answered = true;

  const correctIndex = questions[currentIndex].answer;
  const allOptions = optionsBox.querySelectorAll(".option");

  if (selectedIndex === correctIndex) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
    allOptions[correctIndex].classList.add("correct");
  }

  allOptions.forEach(btn => (btn.disabled = true));
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progress.style.width = "100%";
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
});

// Start the quiz
showQuestion();