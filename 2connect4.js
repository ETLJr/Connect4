/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i< HEIGHT; i ++){
    let row=[];
    for (let j = 0; j<WIDTH; j ++){
      board.push(row)
    
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board')

  // TODO: add comment for this code
  //This creates a row on top of the table and adds click event listeners to it.
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // This code is creating and looping through the board and giving each cell an ID of its x and y coordinates in the htmlBoard
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //return 0;
  let placed = false
  let y=5
  while (y > -1 && placed===false){
    const cell = document.getElementById(`${y}-${x}`)
  if (cell.innerHTML === ''){
    placed = true; 
  } 
   else{
     y--; 
   }
  }
  if (y<0){
    return null
  }
  return y;
  
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`)
  let placed = false
  //y=5
  while (y > -1 && placed===false){
    const cell = document.getElementById(`${y}-${x}`)
  if (cell.innerHTML === ''){
    cell.append(piece)
    placed = true;
    currPlayer = currPlayer === 1 ? 2 : 1;
  }
   else{
     y--
   }
  }
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;


  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x); 
  board[y][x] = currPlayer;


  // check for win

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
   if (board.every(row => row.every( cell => cell))){
     return endGame('Tie Game')
   }
   
  // switch players
  // TODO: switch currPlayer 1 <-> 2
 currPlayer= currPlayer=== 1 ? 2:1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    // return cells.every(
    //   ([y, x]) =>
    //     y >= 0 &&
    //     y < HEIGHT &&
    //     x >= 0 &&
    //     x < WIDTH &&
    //     board[y][x] === currPlayer
    // );
    return cells.every(
      ([y, x]) => {
        const a = board[y][x] === currPlayer
        
        if ( y=== 0 && x===2){
        }
        return y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        a
      }
        
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      const a = _win(horiz);
      const b = _win(vert);
      const c = _win(diagDR);
      const d = _win(diagDL);

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
