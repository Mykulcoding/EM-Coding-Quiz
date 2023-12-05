// Function to load highscores
function loadHighscores() {
  // Get the element with the ID 'highscores'
  const highscoresList = document.getElementById('highscores');

  // Check if the 'highscores' element exists
  if (!highscoresList) {
    // If the element doesn't exist, log an error and return from the function
    console.error("Highscores list element not found");
    return;
  }

  // Log the 'highscores' list element to the console
  console.log("Highscores List Element:", highscoresList);

  // Retrieve highscores from localStorage or initialize an empty array
  const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

  // Sort the highscores array in descending order based on the 'score' property
  highscores.sort((a, b) => b.score - a.score);

  // Clear the contents of the 'highscores' list
  highscoresList.innerHTML = '';

  // Iterate through the highscores array
  highscores.forEach(entry => {
    // Create a new list item element for each entry
    const li = document.createElement('li');
    // Set the text content of the list item to display initials and score
    li.textContent = `${entry.initials} - ${entry.score}`;
    // Append the list item to the 'highscores' list
    highscoresList.appendChild(li);
  });
}

// Event listener for the 'DOMContentLoaded' event
document.addEventListener('DOMContentLoaded', () => {
  // Log that the 'DOMContentLoaded' event has been fired
  console.log("DOMContentLoaded event fired");

  // Call the 'loadHighscores' function when the DOM has finished loading
  loadHighscores();
});
