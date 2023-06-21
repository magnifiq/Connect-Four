const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;


let board = [];
let currentPlayer = PLAYER1;
let gameOver = false;


let boardElement = document.getElementById('board');
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      let cellElement = document.createElement('div');
      cellElement.className = 'cell empty';
      cellElement.dataset.row = row;
      cellElement.dataset.col = col;
      cellElement.addEventListener('click', handleClick);
      boardElement.appendChild(cellElement);
      board[row][col] = EMPTY;
    }
  }


function handleClick(event) {
  if (gameOver) {
    return;
  }
  let cellElement = event.target;
  let row = parseInt(cellElement.dataset.row);
  let col = parseInt(cellElement.dataset.col);
  if (board[row][col] !== EMPTY) {
    return;
  }
  let nextRow = getNextRow(col);
  if (nextRow === -1) {
    return;
  }
  board[nextRow][col] = currentPlayer;
  updateCell(nextRow, col);
  if (checkForWin(nextRow, col)) {
    gameOver = true;
    let messageElement = document.getElementById('message');
    messageElement.textContent = `Player ${currentPlayer} wins!`;
    return;
  }
  if (checkForDraw()) {
    gameOver = true;
    let messageElement = document.getElementById('message');
    messageElement.textContent = "It's a draw!";
    return;
  }
  switchPlayer();
}


function getNextRow(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY) {
      return row;
    }
  }
  return -1;
}


function updateCell(row, col) {
  let cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  cellElement.classList.remove('empty');
  cellElement.classList.add(`player${currentPlayer}`);
}

function checkForWin(row, col) {
    if (
        checkHorizontal(row) ||
        checkVertical(col) ||
        checkDiagonal(row, col) ||
        checkAntiDiagonal(row, col)
    ) {
        return true;
    }
    return false;
}

function checkHorizontal(row) {
let count = 0;
for (let col = 0; col < COLS; col++) {
    if (board[row][col] === currentPlayer) {
    count++;
    if (count === 4) {
        return true;
    }
    } else {
    count = 0;
    }
}
return false;
}


function checkVertical(col) {
let count = 0;
for (let row = 0; row < ROWS; row++) {
    if (board[row][col] === currentPlayer) {
    count++;
    if (count === 4) {
        return true;
    }
    } else {
    count = 0;
    }
}
return false;
}


function checkDiagonal(row, col) {
let startRow = row;
let startCol = col;


while (startRow > 0 && startCol > 0) {
    startRow--;
    startCol--;
}

let count = 0;
while (startRow < ROWS && startCol < COLS) {
    if (board[startRow][startCol] === currentPlayer) {
    count++;
    if (count === 4) {
        return true;
    }
    } else {
    count = 0;
    }
    startRow++;
    startCol++;
}
return false;
}


function checkAntiDiagonal(row, col) {
let startRow = row;
let startCol = col;


while (startRow > 0 && startCol < COLS - 1) {
    startRow--;
    startCol++;
}

let count = 0;
while (startRow < ROWS && startCol >= 0) {
    if (board[startRow][startCol] === currentPlayer) {
    count++;
    if (count === 4) {
        return true;
    }
    } else {
    count = 0;
    }
    startRow++;
    startCol--;
  }
  return false;
 }


function checkForDraw() {
  for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
      if (board[row][col] === EMPTY) {
          return false; 
      }
      }
  }
return true; 
}
