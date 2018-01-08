/*
 * Create a list that holds all of your cards
 */

/* Object storing game variables and UI elements */

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
  openedCard: null, /* Represents currently opened card */
  moves: 0, /* Number of moves */
  matchCounter: 0, /* Number of matches for tracking endgame condition */
  timer: null, /* Timer object, incrementing timeElapsed variable every second */
  timeElapsed: 0, /* Time since game start */
  score: 3, /* Current number of star scores */
  UI: {
	  deck: document.querySelector('.deck'),
	  restartButton: document.querySelector('.restart'), /* Reset button at the top of the deck */
	  moveCounter: document.querySelector('.moves'), 
	  scorePanel: document.querySelector('.stars'), /* Panel with star scores */
	  timePanel: document.querySelector('.timer'),
	  /* UI elements for endgame screen */
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
	/* Function that resets the game */
	 let cardSymbols = shuffle(game.symbols);
	 const deckFragment = document.createDocumentFragment();
	 game.UI.deck.innerHTML = '';
	/* Creating layout */
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
	 /* Reset game variables: timer, score, moves, etc */
	 resetGame();
	 /* Reset game UI to default values */
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
/* Reset game variables */
function resetGame() {
	game.matchCounter = 0;
	game.moves = 0;
	game.timeElapsed = 0;
	game.score = 3;
	if (game.timer!=null) {
		clearInterval(game.timer);
	}
}
/* Reset game UI */
function resetUI() {
    game.UI.moveCounter.innerHTML = '0';
    game.UI.timePanel.innerHTML = '00:00';
    updateStarScore(3);
}

/* Get symbol inside LI card element */
function getCardSymbol(card) {
	return card.firstElementChild.classList[1];
}

/* Detect if card symbol matches the symbol of already opened card */
function detectMatch(card) {
	if ((getCardSymbol(game.openedCard)) == getCardSymbol(card) && game.openedCard!=card) {
    	return true;
  	}
	return false;
	}

/* Formats timeElapsed variable to mm:ss format */
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

/* Toggles 'open' and 'show' classes for a card */
function toggleOpenShow(elem) {
	if (!elem.classList.contains("match") & elem.classList.contains("card")) {
	    elem.classList.toggle("open");
        elem.classList.toggle("show");
	}
}

/* Update variable for number of moves and set star score depending on moves count */
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

/* Create a fragment with stars for updating star score on UI */
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

/* Updated star score during the game */
function updateStarScore(score) {
	game.UI.scorePanel.innerHTML = '';
	const starScoreFragment = getStarScoreFragment(score)
	game.UI.scorePanel.appendChild(starScoreFragment);
}

/* Updates star score for endgame screen */
function updateEndgameStarScore(score) {
	game.UI.endgameScore.innerHTML = '';
	const starScoreFragment = getStarScoreFragment(score);
	game.UI.endgameScore.appendChild(starScoreFragment);
}

/* Update endgame screen info and make it visible */
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
/* Add event listener for Reset button */
game.UI.restartButton.addEventListener('click', createCardLayout);

/* Add event listener for Reset button on endgame screen */
game.UI.endgameRestartButton.addEventListener('click', function() {
	createCardLayout();
	game.UI.endgameModal.classList.toggle("is-endgame");
});

/* Event listener for card click. Contains game logic */
game.UI.deck.addEventListener('click', function showCard(evt) {
	/* Start the timer on first move */
	if (game.moves == 0 && game.openedCard == null) {
		game.timer = setInterval(function() {
			game.timeElapsed += 1;
			game.UI.timePanel.innerHTML = formatTimer(game.timeElapsed);
		}, 1000);
	}
	/* Capture card element */
	let card = (evt.target.nodeName == "LI") ? evt.target : evt.target.parentNode;
	/* Show the card */
	toggleOpenShow(card);
	/* Update opened card if none present */
	if (game.openedCard == null) {
		game.openedCard = card;
	} else {
		/* If a card is already opened update number of moves */
		updateMoves();
		/* On match toggle 'match' class for card, update match counter and reset opened card to null */
		if (detectMatch(card)) {
			game.matchCounter += 1;
			game.openedCard.classList = "card match";
			card.classList = "card match";
            game.openedCard = null;
		}
		/* If cards don't match - hide them with delay and reset opened card */ 
		else {
			setTimeout(toggleOpenShow, 1000, game.openedCard);
			setTimeout(toggleOpenShow, 1000, card);
			game.openedCard = null;
		}
	}
	/* If all cards have been matched - show endgame screen and stop the timer */
	if (game.matchCounter == 8) {
		clearInterval(game.timer);
		showEndgameScreen();
	}
});
