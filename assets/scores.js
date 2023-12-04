function loadHighscores() {
    const highscoresList = document.getElementById('highscores');
    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.sort((a, b) => b.score - a.score); // Sort scores in descending order
    highscores.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.initials} - ${entry.score}`;
      highscoresList.appendChild(li);
    });
  }
  
  function clearHighscores() {
    const highscoresList = document.getElementById('highscores');
    localStorage.removeItem('highscores');
    highscoresList.innerHTML = '';
  }
  
  document.addEventListener('DOMContentLoaded', loadHighscores);