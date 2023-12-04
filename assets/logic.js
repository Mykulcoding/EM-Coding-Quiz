const startButton = document.getElementById('start');
const questionTitle = document.getElementById('question-title');
const choicesContainer = document.getElementById('choices');
const timerDisplay = document.getElementById('time');
const endScreen = document.getElementById('end-screen');
const initialsInput = document.getElementById('initials');
const submitButton = document.getElementById('submit');
const highscoresList = document.getElementById('highscores');

// Access questions from window
const questions = window.questions || [];

if (!window.questions) {
  // If questions are not defined in the window, assign an empty array
  window.questions = questions;
}

let currentQuestionIndex = 0;
let timer;
let score = 0;
let timeLeft = 60; // Initial time in seconds

function hideElement(element) {
  element.classList.add('hide');
}

function showElement(element) {
  element.classList.remove('hide');
}

function startQuiz() {
    console.log('Starting quiz...');
    hideElement(startButton);
    showElement(choicesContainer);
    startTimer();
    displayQuestion(currentQuestionIndex);
  }
  
  function displayQuestion(index) {
    console.log('Displaying question...');
    if (index < questions.length) {
      const currentQuestion = questions[index];
      questionTitle.textContent = currentQuestion.question;
      choicesContainer.innerHTML = '';
  
      currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.addEventListener('click', () => handleAnswerClick(choice, currentQuestion.answer));
        choicesContainer.appendChild(choiceButton);
      });
    } else {
      console.log('End of questions. Ending quiz...');
      endQuiz();
    }
  }
  
  function handleAnswerClick(selectedChoice, correctAnswer) {
    console.log('Handling answer click...');
    // Existing logic...
  }
  
  function endQuiz() {
    console.log('Ending quiz...');
    clearInterval(timer);
    timerDisplay.textContent = timeLeft;
    hideElement(choicesContainer);
    showElement(endScreen);
    document.getElementById('final-score').textContent = score;
  }
  
  function startTimer() {
    console.log('Starting timer...');
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        console.log('Time is up! Ending quiz...');
        endQuiz();
      }
    }, 1000);
  }
  
  function saveHighscores() {
    // Handle saving highscores
  }
  
  startButton.addEventListener('click', startQuiz);
  submitButton.addEventListener('click', saveHighscores);