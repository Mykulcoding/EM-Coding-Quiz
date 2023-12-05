// Importing questions from 'questions.js'
import { questions } from './questions.js';

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', startQuiz);

    // Other initialization or setup code here, if needed
});



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

function startQuiz() {
    console.log('Start button clicked - startQuiz function triggered'); 
    hideElement(startButton);
    showElement(choicesContainer);
    startTimer();
    displayQuestion(currentQuestionIndex);
    console.log('Quiz started');
}
function displayQuestion(index) {
    const currentQuestion = questions[index];
    questionTitle.textContent = currentQuestion.question;
    choicesContainer.innerHTML = '';
    currentQuestion.choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.addEventListener('click', () => handleAnswerClick(choice, currentQuestion.answer));
        choicesContainer.appendChild(choiceButton);
    });
    console.log(`Question ${index + 1} displayed`);
}
function handleAnswerClick(selectedChoice, correctAnswer) {
    if (selectedChoice === correctAnswer) {
        score += 10;
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
    console.log(`Selected choice: ${selectedChoice}, Correct answer: ${correctAnswer}`);
}
function endQuiz() {
    clearInterval(timer);
    timerDisplay.textContent = timeLeft;
    hideElement(choicesContainer);
    showElement(endScreen);
    document.getElementById('final-score').textContent = score;
    console.log('Quiz ended');
}
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
    console.log('Timer started');
}

function saveHighscores() {
    const initials = initialsInput.value.trim();
    if (initials !== '') {
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscores.push({ initials, score });
        localStorage.setItem('highscores', JSON.stringify(highscores));
        window.location.href = 'highscores.html';
    }
}
submitButton.addEventListener('click', saveHighscores);

function hideElement(element) {
    element.style.display = 'none';
}

function showElement(element) {
    element.style.display = 'block';
}