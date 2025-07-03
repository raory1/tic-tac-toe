const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];

    const initializeBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = 0;
            }
        }
    };

    initializeBoard();

    const getBoard = () => board;

    const placeMarker = (row, col, marker) => {
        if (board[row][col] === 0) {
            board[row][col] = marker;
            return true;
        }
        return false;
    };

    const checkWinner = () => {
        if (
            // check rows
            (board[0][0] !== 0 &&
                board[0][0] === board[0][1] &&
                board[0][0] === board[0][2]) ||
            (board[1][0] !== 0 &&
                board[1][0] === board[1][1] &&
                board[1][0] === board[1][2]) ||
            (board[2][0] !== 0 &&
                board[2][0] === board[2][1] &&
                board[2][0] === board[2][2]) ||
            // check columns
            (board[0][0] !== 0 &&
                board[0][0] === board[1][0] &&
                board[0][0] === board[2][0]) ||
            (board[0][1] !== 0 &&
                board[0][1] === board[1][1] &&
                board[0][1] === board[2][1]) ||
            (board[0][2] !== 0 &&
                board[0][2] === board[1][2] &&
                board[0][2] === board[2][2]) ||
            // check diagonals
            (board[0][0] !== 0 &&
                board[0][0] === board[1][1] &&
                board[0][0] === board[2][2]) ||
            (board[2][0] !== 0 &&
                board[2][0] === board[1][1] &&
                board[2][0] === board[0][2])
        ) {
            return 1;
        }

        const isBoardFull = board.every((row) =>
            row.every((cell) => cell !== 0)
        );
        if (isBoardFull) {
            return 2;
        }

        return 0;
    };

    const resetBoard = () => {
        initializeBoard();
    };

    return { getBoard, placeMarker, checkWinner, resetBoard };
})();

const GameController = (function () {
    const createPlayer = (name, marker) => ({ name, marker });
    let isGameOver = false;

    const players = [createPlayer("Isa", "X"), createPlayer("Dani", "O")];
    let currentPlayer = players[0];

    const playRound = (row, column) => {
        if (isGameOver) return;
        const sucess = Gameboard.placeMarker(row, column, currentPlayer.marker);
        if (!sucess) {
            console.log("ei, essa casa já está ocupada!");
            return;
        }

        const hasWinner = Gameboard.checkWinner();
        if (hasWinner === 0) {
            switchPlayer();
            ScreenController.updateScreen();
        } else if (hasWinner === 1 || hasWinner === 2) {
            gameEnd();
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const gameEnd = () => {
        isGameOver = true;
        ScreenController.showWinner(currentPlayer.name);
    };

    const getIsGameOver = () => isGameOver;

    const resetGame = () => {
        isGameOver = false;
        currentPlayer = players[0];
        Gameboard.resetBoard();
    };

    return { playRound, getIsGameOver, resetGame };
})();

const ScreenController = (function () {
    const game = GameController;
    const boardDiv = document.querySelector("#board");

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = Gameboard.getBoard();
        board.forEach((row, i) => {
            row.forEach((cell, j) => {
                const cellBtn = document.createElement("button");
                cellBtn.classList.add("cell");
                cellBtn.textContent = cell !== 0 ? cell : "";
                cellBtn.dataset.row = i;
                cellBtn.dataset.column = j;

                if (game.getIsGameOver() || cell !== 0) {
                    cellBtn.disabled = true;
                }
                boardDiv.append(cellBtn);
            });
        });
    };

    const clickHandler = (e) => {
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        game.playRound(row, column);
        updateScreen();
    };

    const showWinner = (playerName) => {
        boardDiv.removeEventListener("click", clickHandler);
        const winnerText = document.createElement("p");
        winnerText.textContent = playerName;
        document.body.append(winnerText);

        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Reiniciar Jogo";
        document.body.append(restartBtn);
        restartBtn.addEventListener("click", () => {
            document.body.removeChild(winnerText);
            document.body.removeChild(restartBtn);
            game.resetGame();
            boardDiv.addEventListener("click", clickHandler);
            updateScreen();
        });
        updateScreen();
    };

    boardDiv.addEventListener("click", clickHandler);
    updateScreen();

    return { updateScreen, clickHandler, showWinner };
})();
