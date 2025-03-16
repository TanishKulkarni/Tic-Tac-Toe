document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const multiplayerToggle = document.getElementById("toggle-multiplayer");
    const board = document.querySelectorAll(".cell");
    const resetBtn = document.getElementById("reset");
    const difficultySelect = document.getElementById("difficulty");
    const statusText = document.getElementById("status");
    const visualizeButton = document.getElementById("visualize-moves");

    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isMultiplayer = false;
    let difficulty = "easy";
    let aiMoves = []; // Track AI moves

    // 🌙 Theme Toggle
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
    }
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    });

    // 🎮 Toggle Multiplayer Mode
    multiplayerToggle.addEventListener("click", () => {
        isMultiplayer = !isMultiplayer;
        multiplayerToggle.textContent = isMultiplayer ? "Play Single Player" : "Play Multiplayer";
        resetGame();
    });

    // 🎚 Change AI Difficulty
    difficultySelect.addEventListener("change", (e) => {
        difficulty = e.target.value;
        resetGame();
    });

    function checkWin(board, player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => pattern.every(index => board[index] === player));
    }

    function isBoardFull(board) {
        return board.every(cell => cell !== "");
    }

    function handleMove(index) {
        if (gameBoard[index] === "" && currentPlayer === "X") {
            gameBoard[index] = "X";
            board[index].textContent = "X";

            if (checkWin(gameBoard, "X")) {
                statusText.textContent = "Player X Wins!";
                return;
            }

            if (isBoardFull(gameBoard)) {
                statusText.textContent = "It's a Tie!";
                return;
            }

            currentPlayer = "O";
            statusText.textContent = "Turn: O";

            if (!isMultiplayer) {
                setTimeout(aiMove, 700);
            }
        } else if (isMultiplayer && gameBoard[index] === "") {
            gameBoard[index] = currentPlayer;
            board[index].textContent = currentPlayer;

            if (checkWin(gameBoard, currentPlayer)) {
                statusText.textContent = `Player ${currentPlayer} Wins!`;
                return;
            }

            if (isBoardFull(gameBoard)) {
                statusText.textContent = "It's a Tie!";
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Turn: ${currentPlayer}`;
        }
    }

    function aiMove() {
        console.log(`AI (${difficulty}) is thinking...`);

        let availableMoves = gameBoard
            .map((cell, index) => (cell === "" ? index : null))
            .filter(index => index !== null);

        if (availableMoves.length === 0) return;

        let bestMove;

        if (difficulty === "easy") {
            bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        } 
        else if (difficulty === "medium") {
            if (Math.random() < 0.5) {
                bestMove = minimax(gameBoard, "O").index;
            } else {
                bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            }
        } 
        else if (difficulty === "hard") {
            bestMove = minimax(gameBoard, "O").index;
        }

        gameBoard[bestMove] = "O";
        board[bestMove].textContent = "O";

        // Store AI move for visualization
        aiMoves.push(bestMove);

        // Highlight AI move
        board[bestMove].classList.add("ai-move");
        setTimeout(() => {
            board[bestMove].classList.remove("ai-move");
        }, 500);

        if (checkWin(gameBoard, "O")) {
            statusText.textContent = "CPU Wins!";
            return;
        }

        if (isBoardFull(gameBoard)) {
            statusText.textContent = "It's a Tie!";
            return;
        }

        currentPlayer = "X";
        statusText.textContent = "Turn: X";
    }

    function minimax(board, player) {
        let availableMoves = board
            .map((cell, index) => (cell === "" ? index : null))
            .filter(index => index !== null);

        if (checkWin(board, "X")) return { score: -10 };
        if (checkWin(board, "O")) return { score: 10 };
        if (availableMoves.length === 0) return { score: 0 };

        let moves = [];

        for (let i = 0; i < availableMoves.length; i++) {
            let move = {};
            move.index = availableMoves[i];
            board[availableMoves[i]] = player;

            if (player === "O") {
                let result = minimax(board, "X");
                move.score = result.score;
            } else {
                let result = minimax(board, "O");
                move.score = result.score;
            }

            board[availableMoves[i]] = "";
            moves.push(move);
        }

        let bestMove;
        if (player === "O") {
            let highestScore = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > highestScore) {
                    highestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let lowestScore = Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < lowestScore) {
                    lowestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    // 🎥 Visualize AI Moves
    visualizeButton.addEventListener("click", () => {
        let index = 0;
        function highlightMove() {
            if (index < aiMoves.length) {
                let moveIndex = aiMoves[index];
                board[moveIndex].classList.add("highlight-move");
                setTimeout(() => {
                    board[moveIndex].classList.remove("highlight-move");
                    index++;
                    highlightMove();
                }, 700);
            }
        }
        highlightMove();
    });

    board.forEach((cell, index) => cell.addEventListener("click", () => {
        if (!isMultiplayer && currentPlayer === "X") {
            handleMove(index);
        } else if (isMultiplayer) {
            handleMove(index);
        }
    }));

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        aiMoves = [];
        statusText.textContent = "Turn: X";
        board.forEach(cell => (cell.textContent = ""));
    }

    resetBtn.addEventListener("click", resetGame);
});
