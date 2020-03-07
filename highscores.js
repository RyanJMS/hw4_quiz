let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
let clearHighScore = document.querySelector("#clear");

highScores.sort(function(a, b) {
  return b.score - a.score;
});

highScores.forEach(function(score) {
  let highScoresEl = document.getElementById("highScores");
  console.log(score);
  let li = document.createElement("li");
  li.textContent = score.initials + " - " + score.score;
  highScoresEl.appendChild(li);
});

clearHighScore.addEventListener("click", function() {
  localStorage.removeItem("highscores");
  window.location.reload();
});
