let lastAIMove = null; // Stores the last AI move index
let moveHistory = []; // Stores AI move explanations

function aiMove() {
    let boardState = Array.from(document.querySelectorAll(".cell")).map(cell => cell.textContent);
    
    let bestMove = getBestMove(boardState); // AI selects the best move

    if (bestMove === null) return; // Prevent AI from making an invalid move

    let aiCell = document.querySelector(`.cell[data-index="${bestMove}"]`);
    aiCell.textContent = "O"; // Place AI move

    // Flash effect to highlight AI's move
    aiCell.classList.add("ai-move");
    setTimeout(() => aiCell.classList.remove("ai-move"), 500);

    lastAIMove = bestMove; // Store last AI move
    let explanation = explainAIMove(bestMove, boardState); // Generate explanation
    moveHistory.push({ 
        moveNumber: moveHistory.length + 1, 
        position: bestMove, 
        symbol: "O", 
        explanation 
    }); // Store explanation
}

// 🏹 AI Move Explanation Logic
function explainAIMove(index, boardState) {
    let explanation = "AI made a move.";

    // 🏆 1. Winning Move (AI wins the game)
    if (isWinningMove(index, boardState, "O")) {
        explanation = "AI played here to win the game!";
    }
    // ⛔ 2. Blocking Move (AI stops the opponent from winning)
    else if (isWinningMove(index, boardState, "X")) {
        explanation = "AI blocked the opponent's winning move.";
    }
    // 🎯 3. Strategic Center Control
    else if (index === 4) {
        explanation = "AI took the center for strategic control.";
    }
    // 🔳 4. Corner Play (Common strategy in Tic-Tac-Toe)
    else if ([0, 2, 6, 8].includes(index)) {
        explanation = "AI occupied a corner to maximize its advantage.";
    }
    // ➡ 5. Side Move (Less strategic but useful for control)
    else {
        explanation = "AI played a side move for better positioning.";
    }

    return explanation;
}

// ✅ AI Move Selection Function (Placeholder for actual logic)
function getBestMove(boardState) {
    let availableMoves = boardState.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);

    if (availableMoves.length === 0) return null; // No moves available

    // Simple AI: Selects a random available move (Replace with Minimax for a stronger AI)
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// ✅ Check if the move results in a win
function isWinningMove(index, boardState, player) {
    let tempBoard = [...boardState];
    tempBoard[index] = player; // Simulate move

    return checkWin(tempBoard, player);
}

// ✅ Check winning conditions
function checkWin(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => pattern.every(index => board[index] === player));
}
