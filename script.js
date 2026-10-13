const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let gameOver = false;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        // Stop if game is over
        if (gameOver) {
            return;
        }

        // Stop if box is already filled
        if (cell.textContent !== "") {
            return;
        }

        // Put X or O
        cell.textContent = currentPlayer;

if (currentPlayer === "X") {
    cell.classList.add("x");
} else {
    cell.classList.add("o");
}

        // Check winner
        if (checkWinner()) {

            document.getElementById("status").textContent =
                "🎉 Player " + currentPlayer + " Wins!";

            if (currentPlayer === "X") {
                scoreX++;
                document.getElementById("scoreX").textContent = scoreX;
            } else {
                scoreO++;
                document.getElementById("scoreO").textContent = scoreO;
            }

            gameOver = true;
            return;
        }

        // Check draw
        if (checkDraw()) {

            document.getElementById("status").textContent =
                "🤝 It's a Draw!";

            scoreDraw++;
            document.getElementById("scoreDraw").textContent = scoreDraw;

            gameOver = true;
            return;
        }

        // Change player
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        document.getElementById("status").textContent =
            "Player " + currentPlayer + "'s Turn";
    });

});


function checkWinner() {

    for (let pattern of winningPatterns) {

        const a = cells[pattern[0]].textContent;
        const b = cells[pattern[1]].textContent;
        const c = cells[pattern[2]].textContent;

        if (a !== "" && a === b && b === c) {
            return true;
        }
    }

    return false;
}


function checkDraw() {

    for (let cell of cells) {

        if (cell.textContent === "") {
            return false;
        }
    }

    return true;
}


function restartGame() {

    for (let cell of cells) {
        cell.textContent = "";
        cell.classList.remove("x");
        cell.classList.remove("o");
    }

    currentPlayer = "X";
    gameOver = false;

    document.getElementById("status").textContent =
        "Player X's Turn";
}