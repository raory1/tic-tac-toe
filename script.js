const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }

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
        return 0;
    };
    return { getBoard, placeMarker, checkWinner };
})();

const GameController = (function () {
    const createPlayer = (name, marker) => ({ name, marker });

    const players = [createPlayer("Isa", "X"), createPlayer("Dani", "O")];
    let currentPlayer = players[0];

    const playRound = (row, column) => {
        const sucess = Gameboard.placeMarker(row, column, currentPlayer.marker);
        if (!sucess) {
            console.log("ei, essa casa já está ocupada!");
            return;
        }
        const hasWinner = Gameboard.checkWinner();
        if (!hasWinner) {
            switchPlayer();
        } else {
            console.log(`${currentPlayer.name} venceu!`);
        }
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    return { playRound };
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
                cellBtn.textContent = cell;

                cellBtn.dataset.row = i;
                cellBtn.dataset.column = j;

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

    boardDiv.addEventListener("click", clickHandler);
    updateScreen();

    return { updateScreen, clickHandler };
})();
