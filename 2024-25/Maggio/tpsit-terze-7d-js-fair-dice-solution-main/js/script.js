function playGame(game_up) {
  const game_result = document.getElementById("game-result");
  const dice_result = document.getElementById("dice-result");
  const btc_balance = document.getElementById("btc-balance");

  let balance = parseFloat(btc_balance.innerText);

  if (balance < 1) {
    // Cannot play
    dice_result.innerText = "";
    game_result.innerText = "Hai finito i soldi";
    alert("Non puoi giocare, hai finito i soldi");
    return;
  }

  balance--;
  btc_balance.innerText = balance.toString();

  const random_value = Math.floor(Math.random() * 100 + 1);
  dice_result.innerText = `E' uscito ${random_value}`;

  if (gamxe_up && random_value > 50 || !game_up && random_value < 50) {
    // WIN!
    game_result.innerText = "Hai vinto";

    btc_balance.innerText = (balance + 1.5).toString();
  } else {
    // LOSE!
    game_result.innerText = "Hai perso";

    if (balance < 1) {
      alert("Hai finito i soldi");
    }
  }
}

function playGameUp() {
  playGame(true);
}

function playGameDown() {
  playGame(false);
}

function showDisclaimer() {
  const disclaimer = document.getElementById("disclaimer");
  disclaimer.classList.remove("hide");
}

function hideDisclaimer() {
  const disclaimer = document.getElementById("disclaimer");
  disclaimer.classList.add("hide");
}

window.addEventListener("load", function() {
  const play_game_up_btn = document.getElementById("play-game-up-btn");
  play_game_up_btn.addEventListener("click", playGameUp);

  const play_game_down_btn = document.getElementById("play-game-down-btn");
  play_game_down_btn.addEventListener("click", playGameDown);

  const show_tos_btn = document.getElementById("show-disclaimer-btn");
  show_tos_btn.addEventListener("click", showDisclaimer);

  const disclaimer = document.getElementById("disclaimer");
  disclaimer.addEventListener("click", hideDisclaimer);
});