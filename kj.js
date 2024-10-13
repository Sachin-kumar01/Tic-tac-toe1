// Select elements
const boxes = document.querySelectorAll('.box');
const msgContainer = document.querySelector('.msg-container');
const msg = document.getElementById('msg');
const resetBtn = document.getElementById('reset-btn');
const newBtn = document.getElementById('new-btn');

// Initialize game state variables
let gameActive = true;
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

// Function to handle box clicks
boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(box, index));
});

// Handle box click
function handleBoxClick(box, index) {
    if (box.textContent !== '' || !gameActive) {
        return; // Ignore if box is already filled or game is not active
    }

    box.textContent = currentPlayer;
    board[index] = currentPlayer;

    if (checkWinner()) {
        msg.textContent = `${currentPlayer} wins!`;
        msgContainer.classList.remove('hide');
        gameActive = false;
    } else if (board.every(cell => cell)) {
        msg.textContent = 'It\'s a draw!';
        msgContainer.classList.remove('hide');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
}

// Check for a winner
function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    return winningConditions.some(condition => {
        return condition.every(index => {
            return boxes[index].textContent === currentPlayer;
        });
    });
}

// Reset game
function resetGame() {
    board.fill(''); // Reset board array
    boxes.forEach(box => {
        box.textContent = ''; // Clear boxes
    });
    msgContainer.classList.add('hide'); // Hide message
    gameActive = true; // Set game to active
    currentPlayer = 'X'; // Reset to the first player
}

// Event listeners for reset and new game buttons
resetBtn.addEventListener('click', resetGame);
newBtn.addEventListener('click', resetGame);
