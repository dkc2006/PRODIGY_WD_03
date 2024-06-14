document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const messageScreen = document.getElementById('message-screen');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    const newGameButton = document.getElementById('new-game');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let isGameActive = true;

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

    const handleCellClick = (event) => {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] || !isGameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            showMessage(`Player ${currentPlayer} Wins!`);
            isGameActive = false;
            return;
        }

        if (board.every(cell => cell)) {
            showMessage("It's a Tie!");
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return board[index] === currentPlayer;
            });
        });
    };

    const showMessage = (msg) => {
        message.textContent = msg;
        messageScreen.classList.remove('hidden');
        messageScreen.style.display = 'flex';
    };

    const restartGame = () => {
        board.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        isGameActive = true;
        messageScreen.classList.add('hidden');
        messageScreen.style.display = 'none';
    };

    const newGame = () => {
        restartGame();
        messageScreen.classList.add('hidden');
        messageScreen.style.display = 'none';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    newGameButton.addEventListener('click', newGame);
});
