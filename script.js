// Game state
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM Elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// Initialize event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    // Check if cell is already played or game is over
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    // Update game board and cell
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.disabled = true;

    // Check for winner or draw
    checkGameStatus();

    // Switch player
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

// Check game status
function checkGameStatus() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] === '' || gameBoard[b] === '' || gameBoard[c] === '') {
            continue;
        }
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `🎉 Player ${currentPlayer} Wins!`;
        statusDisplay.classList.add('winner');
        gameActive = false;
        disableAllCells();
        return;
    }

    // Check for draw
    if (!gameBoard.includes('')) {
        statusDisplay.textContent = "🤝 It's a Draw!";
        statusDisplay.classList.add('draw');
        gameActive = false;
        return;
    }
}

// Update status display
function updateStatus() {
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    statusDisplay.classList.remove('winner', 'draw');
}

// Disable all cells
function disableAllCells() {
    cells.forEach(cell => {
        cell.disabled = true;
    });
}

// Reset game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    // Reset cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.disabled = false;
    });

    // Reset status
    statusDisplay.textContent = "Player X's Turn";
    statusDisplay.classList.remove('winner', 'draw');
}