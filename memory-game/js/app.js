/*
 * Create a list that holds all of your cards
 */
var game = {
  symbols: [
    "fa-500px",
    "fa-github",
    "fa-steam",
    "fa-windows",
    "fa-apple",
    "fa-chrome",
    "fa-linux",
    "fa-google",
    "fa-500px",
    "fa-github",
    "fa-steam",
    "fa-windows",
    "fa-apple",
    "fa-chrome",
    "fa-linux",
    "fa-google"
  ], 
  openedCard: null,
  moves: 0,
  matchCounter: 0, 
  timer: null,
  timeElapsed: 0,
  score: 3,
  UI: {
	  deck: document.querySelector('.deck'),
	  restartButton: document.querySelector('.restart'),
	  moveCounter: document.querySelector('.moves'),
	  scorePanel: document.querySelector('.stars'),
	  timePanel: document.querySelector('.timer'),
	  endgameTime: document.querySelector('#endgame-time'),
	  endgameMoves: document.querySelector('#endgame-moves'),
	  endgameScore: document.querySelector('.endgame-score'),
	  endgameModal: document.querySelector('.modal'),
	  endgameRestartButton: document.querySelector('.newgame-button')
  }
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function createCardLayout() {

	 let cardSymbols = shuffle(game.symbols);
	 const deckFragment = document.createDocumentFragment();
	 game.UI.deck.innerHTML = '';

	 for (let symbol of cardSymbols) {
		const card = document.createElement('li');
		card.classList.add("card");
		const cardContent = document.createElement('i');
		cardContent.classList.add("fa");
		cardContent.classList.add(symbol);
		card.appendChild(cardContent);
		deckFragment.appendChild(card);
	 }
	 game.UI.deck.appendChild(deckFragment);
	 resetGame();
	 resetUI();
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function resetGame() {
	game.matchCounter = 0;
	game.moves = 0;
	game.timeElapsed = 0;
	game.score = 3;
	if (game.timer!=null) {
		clearInterval(game.timer);
	}
}

function resetUI() {
    game.UI.moveCounter.innerHTML = '0';
    game.UI.timePanel.innerHTML = '00:00';
    updateStarScore(3);
}

function getCardSymbol(card) {
	return card.firstElementChild.classList[1];
}

function detectMatch(card) {
	if ((getCardSymbol(game.openedCard)) == getCardSymbol(card) && game.openedCard!=card) {
    	return true;
  	}
	return false;
	}

function formatTimer(total) {
	const minutes = Math.floor(total / 60);
	const seconds = total % 60;
	let secondsFormatted = '';
	let minutesFormatted = '';
	if (seconds < 10) {
		secondsFormatted = '0' + seconds.toString();
	} else {
		secondsFormatted = seconds.toString();
	}
	if (minutes < 10) {
		minutesFormatted = '0' + minutes.toString();
	} else {
		minutesFormatted = minutes.toString();
	}
	return minutesFormatted + ':' + secondsFormatted;
}

function toggleOpenShow(elem) {
	if (!elem.classList.contains("match") & elem.classList.contains("card")) {
	    elem.classList.toggle("open");
        elem.classList.toggle("show");
	}
}

function updateMoves() {
	game.moves += 1;
	if (game.moves < 12) {

		updateStarScore(3);
	} else if (game.moves < 18) {
		game.score = 2;
		updateStarScore(2);
	} else {
		game.score = 1;
		updateStarScore(1);
	}
	game.UI.moveCounter.textContent = game.moves;
}

function getStarScoreFragment(score) {
const starPanelFragment = document.createDocumentFragment();
	for (let i = 0; i < score; i++) {
	const starLi = document.createElement("li");
	const starI = document.createElement("i");
	starI.className = "fa fa-star";
	starLi.appendChild(starI);
	starPanelFragment.appendChild(starLi);
	}
return starPanelFragment;
}

function updateStarScore(score) {
	game.UI.scorePanel.innerHTML = '';
	const starScoreFragment = getStarScoreFragment(score)
	game.UI.scorePanel.appendChild(starScoreFragment);
}

function updateEndgameStarScore(score) {
	game.UI.endgameScore.innerHTML = '';
	const starScoreFragment = getStarScoreFragment(score);
	game.UI.endgameScore.appendChild(starScoreFragment);
}

function showEndgameScreen() {
	game.UI.endgameMoves.innerHTML = game.moves;
	game.UI.endgameTime.innerHTML = formatTimer(game.timeElapsed);
	updateEndgameStarScore(game.score);
	game.UI.endgameModal.classList.toggle("is-endgame");
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

game.UI.restartButton.addEventListener('click', createCardLayout);

game.UI.endgameRestartButton.addEventListener('click', function() {
	createCardLayout();
	game.UI.endgameModal.classList.toggle("is-endgame");
});

game.UI.deck.addEventListener('click', function showCard(evt) {
	if (game.moves == 0 && game.openedCard == null) {
		game.timer = setInterval(function() {
			game.timeElapsed += 1;
			game.UI.timePanel.innerHTML = formatTimer(game.timeElapsed);
		}, 1000);
	}
	let card = (evt.target.nodeName == "LI") ? evt.target : evt.target.parentNode;
	toggleOpenShow(card);
	if (game.openedCard == null) {
		game.openedCard = card;
	} else {
		updateMoves();
		if (detectMatch(card)) {
			game.matchCounter += 1;
			game.openedCard.classList = "card match";
			card.classList = "card match";
            game.openedCard = null;
		} else {
			setTimeout(toggleOpenShow, 1000, game.openedCard);
			setTimeout(toggleOpenShow, 1000, card);
			game.openedCard = null;
		}
	}
	if (game.matchCounter == 8) {
		clearInterval(game.timer);
		showEndgameScreen();
	}
});
