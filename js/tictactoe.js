//GLOBAL VARIABLES
const gameBoard = document.querySelector('#board');

//GLOBAL FUNCTIONS
function hideGameBoard(screenToDisplay) {
  screenToDisplay.style.display = '';
  gameBoard.style.display = 'none';
}
function showGameBoard() {
  gameBoard.style.display = '';
  startScreen.style.display = 'none';
  endScreen.style.display = 'none';
}
/*
STEP - 1
When the page loads, the startup screen should appear. Use the tictactoe-01-start.png mockup, and the start.txt HTML snippet to guide you.
*/
// Create the Start Screen <div> element per the start.txt snippet.  Add the appropriate classes and id to it.  Add 'display: none' style as a default.
const startScreen = document.createElement('div');
startScreen.id = 'start';
startScreen.classList.add('screen-start');
startScreen.classList.add('screen');
startScreen.style.display = 'none';

//Create the <header> elemend inside the Start Screen <div>
const startScreenHeader = document.createElement('header');

//Create the <H1> elemend and <a> element inside the <header> and add text content, classes, and attributes.
const startScreenH1 = document.createElement('h1');
startScreenH1.textContent = 'Tic Tac Toe';
const startScreenButton = document.createElement('a');
startScreenButton.textContent = 'Start game';
startScreenButton.classList.add('button');
startScreenButton.setAttribute('href', '#');

//Append the header, H1, and anchor to the div.
startScreen.appendChild(startScreenHeader);
startScreenHeader.appendChild(startScreenH1);
startScreenHeader.appendChild(startScreenButton);

//On page load, hide the game board and display the start screen.  I also appended the End Screen to the document.  It has the style 'display: none' set initially.
window.addEventListener("load", () => {
  document.querySelector('body').appendChild(startScreen);
  document.querySelector('body').appendChild(endScreen);
  hideGameBoard(startScreen);
});

/*
STEP - 2
Add programming, so that when the player clicks the start button the start screen disappears, the board appears, and the game begins. Use the tictactoe-02-inprogress.png mockup, and the board.txt HTML snippet to guide you.
*/
startScreenButton.addEventListener('click', () => {
  showGameBoard();
});

/*
STEP - 3
Add the game play following these rules:
-Play alternates between X and O.

-The current player is indicated at the top of the page -- the box with the symbol O or X is highlighted for the current player. You can do this by simply adding the class .active to the proper list item in the HTML. For example, if it's player one's turn, the HTML should look like this: <li class="players active" id="player1">

-When the current player mouses over an empty square on the board, it's symbol the X or O should appear on the square. You can do this using the x.svg or o.svg graphics (hint use JavaScript to set the background-image property for that box.)

-Players can only click on empty squares. When the player clicks on an empty square, attach the class box-filled-1 (for O) or box-filled-2 (for X) to the square. The CSS we're providing will automatically add the proper image to the square marking it as occupied.

-The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally. If all of the squares are filled and no players have three in a row, the game is a tie.
*/
//Create an array with all of the li elements (boxes)
const boxArray = document.querySelectorAll('.box');

//Save the UL to a variable for event listenrs via bubbling.
const boxesUL = document.querySelector('.boxes');

//Create variables for the two player list items and add the "active" class to player 1 by default.
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
player1.classList.add('active');

//Add an event listener to the UL and apply the background to the target of the mouseover event.
boxesUL.addEventListener('mouseover', () => {
  /*
  Reviewer Comments:
    Almost everything is working; there's a slight problem. Clicking boxes and and hovering over occupied boxes is working well, until I hover over my opponent's box. Make sure when, to serve as an example, when O hovers over an occupied X box that X's box doesn't change to O.
  */
  //ADDED THIS IF STATEMENT TO PREVENT THE X OR O FROM APPEARING ON HOVER IF THE BOX IS ALREADY FILLED.
  //NOT SURE THAT THIS WARRANTED NOT MEETING THE REQUIREMENTS FOR THE PROJECT - BUT IT'S DONE NOW.
  if (event.target.classList.contains('box-filled-1') || event.target.classList.contains('box-filled-2')) {
    event.target.style.backgroundImage = '';
  } else {
    if (player1.classList.contains('active')) {
      event.target.style.backgroundImage = 'url(img/o.svg)';
    } else if (player2.classList.contains('active')) {
      event.target.style.backgroundImage = 'url(img/x.svg)';
    }
  };
});

//Add an event listner to the UL and remove the background from the target of the mouseout event.
boxesUL.addEventListener('mouseout', () => {
  event.target.style.backgroundImage = '';
});

//Add an event listener to the UL and swap the active class of the players when a box is filled, along with apply the filled class.
boxesUL.addEventListener('click', () => {
  function swapActiveClass(element1, element2) {
    element1.classList.remove('active');
    element2.classList.add('active');
  }

  const targetClasses = event.target.classList;

  if (targetClasses.contains('box-filled-1') === false && targetClasses.contains('box-filled-2') === false) {
    if (player1.classList.contains('active')) {
      event.target.classList.add('box-filled-1');
      swapActiveClass(player1, player2);
    } else if (player2.classList.contains('active')) {
      event.target.classList.add('box-filled-2');
      swapActiveClass(player2, player1);
    };
  };
});
/*
STEP - 4
Add programming so that when the game ends, the board disappears and the game end screen appears. Use the tictactoe-03-winner1.png and tictactoe-04-winner2.png mockups, and the win.txt HTML snippet for guidance. Depending on the game results the final screen should:

-Show the word "Winner" or the phrase "It's a Tie!"

-Add the appropriate class to the <div> for the winning screen: <div class="screen screen-win" id="finish"> screen-win-one for player 1, screen-win-two for player two, or screen-win-tie if the game ends with no winner. For example, if player 1 wins, the HTML should look like this: <div class="screen screen-win screen-win-one" id="finish">
*/
// Create the End Screen <div> element per the HTML snippet in win.txt.  Add classes and an ID and set the 'display: none' style.
const endScreen = document.createElement('div');
endScreen.classList.add('screen');
endScreen.classList.add('screen-win');
endScreen.id = 'finish';
endScreen.style.display = 'none';

//Create the <header> element that goes in the <div>
const endScreenHeader = document.createElement('header');

//Create the <H1>, <p>, and <a> elements that go in the header and add classes, attributes, and text content as needed per the snippet.
const endScreenH1 = document.createElement('h1');
endScreenH1.textContent = 'Tic Tac Toe';
const endScreenMessage = document.createElement('p');
endScreenMessage.classList.add('message');
const endScreenButton = document.createElement('a');
endScreenButton.classList.add('button');
endScreenButton.setAttribute('href', '#');
endScreenButton.textContent = 'New game';

//Append the <a> and <H1> to the <header>, and the <header> to the <div>.
endScreen.appendChild(endScreenHeader);
endScreenHeader.appendChild(endScreenH1);
endScreenHeader.appendChild(endScreenMessage);
endScreenHeader.appendChild(endScreenButton);

//This event listener evaluates (after each click on the UL) whether the game is won by one of the players, or if it's a tie.
boxesUL.addEventListener('click', () => {
    //Setting conditions to false initially.
    let rowWin = false;
    let columnWin = false;
    let diagonalWin = false;
    let fullGrid = false;

    //FUNCTIONS FOR OUTCOME EVALUATION
    //Row Winning Conditions: [0,1,2], [3,4,5], [6,7,8]
    function checkRows(className){
      if (boxArray[0].classList.contains(className) && boxArray[1].classList.contains(className) && boxArray[2].classList.contains(className)) {
        rowWin = true;
      } else if (boxArray[3].classList.contains(className) && boxArray[4].classList.contains(className) && boxArray[5].classList.contains(className)) {
        rowWin = true;
      } else if (boxArray[6].classList.contains(className) && boxArray[7].classList.contains(className) && boxArray[8].classList.contains(className)) {
        rowWin = true;
      }
      return rowWin;
    }

    //Column Winning Conditions: [0,3,6], [1,4,7], [2,5,8]
    function checkColumns(className) {
      if (boxArray[0].classList.contains(className) && boxArray[3].classList.contains(className) && boxArray[6].classList.contains(className)) {
        rowWin = true;
      } else if (boxArray[1].classList.contains(className) && boxArray[4].classList.contains(className) && boxArray[7].classList.contains(className)) {
        rowWin = true;
      } else if (boxArray[2].classList.contains(className) && boxArray[5].classList.contains(className) && boxArray[8].classList.contains(className)) {
        rowWin = true;
      }
      return rowWin;
    }

    //Diagonal Winning Conditions: [0,4,8], [2,4,6]
    function checkDiagonals(className) {
      if (boxArray[0].classList.contains(className) && boxArray[4].classList.contains(className) && boxArray[8].classList.contains(className)) {
        rowWin = true;
      } else if (boxArray[2].classList.contains(className) && boxArray[4].classList.contains(className) && boxArray[6].classList.contains(className)) {
        rowWin = true;
      }
      return rowWin;
    }

    //Tie, full grid.
    function checkFullGrid(className1, className2) {
      let boxFilledArray = [false, false, false, false, false, false, false, false, false];
      for (let i = 0; i < boxArray.length; i += 1) {
        if (boxArray[i].classList.contains(className1) || boxArray[i].classList.contains(className2)) {
          boxFilledArray[i] = true;
        }
      }
      if (boxFilledArray[0] && boxFilledArray[1] && boxFilledArray[2] && boxFilledArray[3] && boxFilledArray[4] && boxFilledArray[5] && boxFilledArray[6] && boxFilledArray[7] && boxFilledArray[8]) {
        fullGrid = true;
      }
      return fullGrid;
    }

  //This function will swap the class of the End Screen <div> element based on which outcome was reached.
  function swapEndScreenClass(element, addClass, removeClass1, removeClass2) {
    element.classList.add(addClass);
    element.classList.remove(removeClass1);
    element.classList.remove(removeClass2);
  }

  //This if statement use the outcome evalutation functions to determine if there was a winner, or if it was a tie.  Then it hides the game board and displays the appropriate End Screen.
  if (checkRows('box-filled-1') || checkColumns('box-filled-1') || checkDiagonals('box-filled-1')) {
    swapEndScreenClass(endScreen, 'screen-win-one', 'screen-win-two', 'screen-win-tie');
    endScreenMessage.textContent = 'Winner!';
    hideGameBoard(endScreen);
  } else if (checkRows('box-filled-2') || checkColumns('box-filled-2') || checkDiagonals('box-filled-2')) {
    swapEndScreenClass(endScreen, 'screen-win-two', 'screen-win-one', 'screen-win-tie');
    endScreenMessage.textContent = 'Winner!';
    hideGameBoard(endScreen);
  } else if (checkFullGrid('box-filled-1', 'box-filled-2')) {
    swapEndScreenClass(endScreen, 'screen-win-tie', 'screen-win-one', 'screen-win-two');
    endScreenMessage.textContent = "It's a tie!";
    hideGameBoard(endScreen);
  }
});

/*
STEP - 5
Add programming so that when a player pushes the "New Game" button, the board appears again, empty, and a new game begins.
*/
endScreenButton.addEventListener('click', () => {
  for (let i = 0; i < boxArray.length; i += 1) {
    boxArray[i].classList.remove('box-filled-1');
    boxArray[i].classList.remove('box-filled-2');
  }
  showGameBoard();
});
