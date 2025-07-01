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
    return { getBoard, placeMarker };
}

function createPlayer(name, marker) {
    return { name, marker };
}

const gameController = (function () {
    const players = [createPlayer("Isa", "X"), createPlayer("Dani", "O")];
    let currentPlayer = players[0];
    const playRound = (row, column) => {
        board.placeMarker(1, 2, currentPlayer.marker);
    };

    return { playRound };
})();

const board = Gameboard();

board.placeMarker(0, 1, 2);
console.log(board.getBoard());

gameController.playRound(1,2);
console.log(board.getBoard());
