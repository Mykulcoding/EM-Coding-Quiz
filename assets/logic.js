// Importing questions from 'questions.js'
import { questions } from './questions.js';

document.addEventListener('DOMContentLoaded', function() { //This line adds an event listener to the document object, listening for the 'DOMContentLoaded' event, which fires when the initial HTML document has been completely loaded and parsed without waiting for stylesheets, images, and subframes to finish loading.
    const startButton = document.getElementById('start'); //  This line selects an element in the document with the ID 'start' and assigns it to the variable 
    startButton.addEventListener('click', startQuiz); //This line attaches an event listener to the startButton element, listening for a 'click' event and invoking the startQuiz function when the button is clicked.

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
    const currentQuestion = questions[index];  //Retrieves the current question from the questions array based on the provided index.
    questionTitle.textContent = currentQuestion.question; // Sets the text content of an element with the ID question-title to the text of the current question.
    choicesContainer.innerHTML = ''; //Clears the HTML content inside the choicesContainer element.
    currentQuestion.choices.forEach(choice => { // Initiates a loop through each choice in the currentQuestion's choices array.
        const choiceButton = document.createElement('button'); //Creates a new button element.
        choiceButton.textContent = choice; // Sets the text content of the created button to the current choice.
        choiceButton.addEventListener('click', () => handleAnswerClick(choice, currentQuestion.answer)); // Adds a click event listener to the choiceButton that triggers the handleAnswerClick function with the selected choice and the correct answer from the current question when clicked
        choicesContainer.appendChild(choiceButton); // Appends the choiceButton (representing a choice) to the choicesContainer element, displaying it on the webpage.
    });
    console.log(`Question ${index + 1} displayed`);
}
function handleAnswerClick(selectedChoice, correctAnswer) { //Begins the handleAnswerClick function, which processes the user's selected choice and correct answer.
    if (selectedChoice === correctAnswer) { // Checks if the selected choice matches the correct answer.
        score += 10; // If the choice is correct, increments the score by 10. OTHERWISE
    } else {
        timeLeft -= 10; //Reduces the time left by 10 seconds for an incorrect answer. //Checks if the time left is below 0 and resets it to 0 if so.
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
    currentQuestionIndex++; //Moves to the next question by incrementing the currentQuestionIndex.
    if (currentQuestionIndex < questions.length) { //Checks if there are more questions available.
        displayQuestion(currentQuestionIndex); // If available, displays the next question. OTHERWISE
    } else {
        endQuiz(); //Ends the quiz if there are no more questions.
    }
    console.log(`Selected choice: ${selectedChoice}, Correct answer: ${correctAnswer}`);
}
function endQuiz() { // Ends the quiz and displays the final score.
    clearInterval(timer);  // Stops the timer.
    timerDisplay.textContent = timeLeft; // Updates the timer display with the remaining time. 
    hideElement(choicesContainer); //Hides the question choices.
    showElement(endScreen); //Shows the end screen
    document.getElementById('final-score').textContent = score; //Sets the final score on the screen
    console.log('Quiz ended'); 
}
function startTimer() { // Starts timer
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);// Updates the timer display every second. If the time reaches 0, the quiz ends.
    console.log('Timer started');
}

function saveHighscores() { //Fetches the initials, stores the high scores in local storage, and redirects to the highscores page.
    const initials = initialsInput.value.trim();
    if (initials !== '') {
        const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        highscores.push({ initials, score });
        localStorage.setItem('highscores', JSON.stringify(highscores));
        window.location.href = 'highscores.html';
    }
}
submitButton.addEventListener('click', saveHighscores); //Listens for a click on the submit button to save high scores.

function hideElement(element) { //Utility function to hide an HTML element.
    element.style.display = 'none';
}

function showElement(element) { //Utility function to display an HTML element.
    element.style.display = 'block';
}