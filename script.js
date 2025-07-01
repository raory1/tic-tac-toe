function Gameboard() {
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
            console.log("marcador adicionado");
            board[row][col] = marker;
            return true;
        }
        console.log("a casa está ocupada");
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
}

function createPlayer(name, marker) {
    return { name, marker };
}

const gameController = (function () {
    const players = [createPlayer("Isa", "X"), createPlayer("Dani", "O")];
    let currentPlayer = players[0];

    const playRound = (row, column) => {
        board.placeMarker(row, column, currentPlayer.marker);
        const hasWinner = board.checkWinner();
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

const board = Gameboard();

console.log(board.getBoard());

gameController.playRound(1, 2);
gameController.playRound(0, 2);
gameController.playRound(1, 0);
gameController.playRound(0, 0);
gameController.playRound(0, 1);
gameController.playRound(1, 1);
gameController.playRound(2, 1);
gameController.playRound(2, 2);

console.log(board.getBoard());
