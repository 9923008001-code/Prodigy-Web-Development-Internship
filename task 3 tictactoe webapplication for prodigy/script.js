let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let xWins = 0;
let oWins = 0;
let gameMode = "human"; // default human vs human

const statusText = document.getElementById("status");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

// Winning Patterns
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Change mode
function setMode(mode) {
    gameMode = mode;
    resetGame();
    statusText.innerText = mode === "ai"
        ? "Player X vs AI (O)"
        : "2 Player Mode - Player X Starts";
}

// When user clicks cell
function handleClick(index) {
    if (board[index] !== "") return;

    clickSound.play();

    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;

    if (checkWinner()) return;

    switchPlayer();

    if (gameMode === "ai" && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

// Switch players
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

// AI Logic – chooses a random empty cell
function aiMove() {
    let emptyCells = board.map((v, i) => v === "" ? i : null).filter(i => i !== null);
    if (emptyCells.length === 0) return;

    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[move] = "O";
    document.getElementsByClassName("cell")[move].innerText = "O";

    checkWinner();
    switchPlayer();
}

// Check win and highlight
function checkWinner() {
    for (let condition of winConditions) {
        let [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {

            highlightWin(a, b, c);
            winSound.play();

            if (board[a] === "X") xWins++;
            else oWins++;

            updateScore();

            setTimeout(() => {
                clearHighlight();
                resetBoardOnly();
            }, 1500);

            return true;
        }
    }
    return false;
}

// Highlight winner
function highlightWin(a, b, c) {
    let cells = document.getElementsByClassName("cell");
    cells[a].classList.add("win");
    cells[b].classList.add("win");
    cells[c].classList.add("win");
}

// Remove highlight after reset
function clearHighlight() {
    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) {
        cell.classList.remove("win");
    }
}

// Update score
function updateScore() {
    document.getElementById("scoreX").innerText = `X Wins: ${xWins}`;
    document.getElementById("scoreO").innerText = `O Wins: ${oWins}`;
}

// Reset only board (after win)
function resetBoardOnly() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.innerText = "Player X's Turn";

    let cells = document.getElementsByClassName("cell");
    for (let cell of cells) cell.innerText = "";
}

// Full reset (scores + board)
function resetGame() {
    xWins = 0;
    oWins = 0;
    updateScore();
    resetBoardOnly();
}
function checkWinner() {
    let winnerFound = false;

    for (let condition of winConditions) {
        let [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {

            highlightWin(a, b, c);
            winSound.play();

            if (board[a] === "X") xWins++;
            else oWins++;

            updateScore();

            setTimeout(() => {
                clearHighlight();
                resetBoardOnly();
            }, 1500);

            winnerFound = true;
            return true;
        }
    }

    // Check for Draw
    if (!winnerFound && !board.includes("")) {
        statusText.innerText = "It's a Draw!";
        setTimeout(() => {
            resetBoardOnly();
        }, 1500);
        return true;
    }

    return false;
}

