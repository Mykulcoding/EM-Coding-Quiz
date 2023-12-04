//PSEUDOCODE

// HTML elements
// - Start button
// - Questions container
// - Timer display
// - End screen for initials and score input
// - Highscores display screen

// Global Variables
// - Questions array with objects containing question, choices, and correct answer
// - Timer variable
// - Score variable
// - Current question index
// - Event listeners for start button and choice selection

// Function to start the quiz
  // Hide start screen
  // Show questions container
  // Start timer
  // Display current question and choices

// Function to display questions
  // Display question text
  // Display choices as buttons/options

// Function to handle answer selection
  // Check if the selected answer is correct
  // If correct, increment score
  // If incorrect, deduct time from the timer

// Function to end the quiz
  // Stop the timer
  // Show end screen with final score
  // Prompt for initials input and save score

// Function to save highscores
  // Store initials and score in local storage
  // Display highscores on the highscores.html page

// Function to load highscores
  // Retrieve highscores from local storage
  // Display highscores on the highscores.html page

// Event listeners
// - Start button click starts the quiz
// - Choice selection triggers answer handling
// - Submit button at the end saves highscores

// Function to handle highscore clearing
  // Clear highscores from local storage
  // Update highscores display

  //CODE

  import questions from './questions.js';

  const startButton = document.getElementById('start');
  const questionTitle = document.getElementById('question-title');
  const choicesContainer = document.getElementById('choices');
  const timerDisplay = document.getElementById('time');
  const endScreen = document.getElementById('end-screen');
  const initialsInput = document.getElementById('initials');
  const submitButton = document.getElementById('submit');
  const highscoresList = document.getElementById('highscores');
  
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
    hideElement(startButton);
    showElement(choicesContainer);
    startTimer();
    displayQuestion(currentQuestionIndex);
  }
  
  function displayQuestion(index) {
    const currentQuestion = window.questions[index]; // Access questions from the window object
    questionTitle.textContent = currentQuestion.question;
    choicesContainer.innerHTML = '';
  
    currentQuestion.choices.forEach(choice => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = choice;
      choiceButton.addEventListener('click', () => handleAnswerClick(choice, currentQuestion.answer));
      choicesContainer.appendChild(choiceButton);
    });
  }
  
  function handleAnswerClick(selectedChoice, correctAnswer) {
    // Handle answer click logic
  }
  
  function endQuiz() {
    clearInterval(timer);
    timerDisplay.textContent = timeLeft;
    hideElement(choicesContainer);
    showElement(endScreen);
    document.getElementById('final-score').textContent = score;
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  function saveHighscores() {
    // Handle saving highscores
  }
  
  startButton.addEventListener('click', startQuiz);
  submitButton.addEventListener('click', saveHighscores);
  