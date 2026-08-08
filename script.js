const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
    {
        question: "What is Baby Hasnain's favorite drink?",
        answers: [
            { text: "Milk", correct: true },
            { text: "Juice", correct: false },
            { text: "Tea", correct: false },
            { text: "Coffee", correct: false }
        ]
    },

    {
        question: "When was Baby Hasnain born?",
        answers: [
            { text: "24 March", correct: true },
            { text: "10 January", correct: false },
            { text: "15 April", correct: false },
            { text: "5 May", correct: false }
        ]
    },

    {
        question: "What does Baby Hasnain love to do?",
        answers: [
            { text: "Sleep", correct: true },
            { text: "Drive", correct: false },
            { text: "Cook", correct: false },
            { text: "Study", correct: false }
        ]
    },

    {
        question: "Who takes care of Baby Hasnain?",
        answers: [
            { text: "Mom and Dad", correct: true },
            { text: "Teacher", correct: false },
            { text: "Doctor only", correct: false },
            { text: "Friends", correct: false }
        ]
    },

    {
        question: "What does Baby Hasnain wear?",
        answers: [
            { text: "Baby clothes", correct: true },
            { text: "School uniform", correct: false },
            { text: "Suit", correct: false },
            { text: "Sports uniform", correct: false }
        ]
    },

    {
        question: "What does Baby Hasnain usually do when hungry?",
        answers: [
            { text: "Cry", correct: true },
            { text: "Run", correct: false },
            { text: "Read", correct: false },
            { text: "Dance", correct: false }
        ]
    },

    {
        question: "What is Baby Hasnain?",
        answers: [
            { text: "A cute baby boy", correct: true },
            { text: "A teacher", correct: false },
            { text: "A doctor", correct: false },
            { text: "A football player", correct: false }
        ]
    },

    {
        question: "What makes Baby Hasnain happy?",
        answers: [
            { text: "Love and cuddles", correct: true },
            { text: "Homework", correct: false },
            { text: "Traffic", correct: false },
            { text: "Running", correct: false }
        ]
    },

    {
        question: "Who loves Baby Hasnain very much?",
        answers: [
            { text: "His family", correct: true },
            { text: "Nobody", correct: false },
            { text: "His teacher", correct: false },
            { text: "His classmates", correct: false }
        ]
    },

    {
        question: "What is Baby Hasnain's special quality?",
        answers: [
            { text: "He is very cute", correct: true },
            { text: "He can drive", correct: false },
            { text: "He can cook", correct: false },
            { text: "He can fly", correct: false }
        ]
    }
];
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

  function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}
function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
