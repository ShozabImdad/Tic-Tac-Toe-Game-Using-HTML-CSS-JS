let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let gameContainer = document.querySelector(".container");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 5, 8],
    [6, 7, 8]
];

const disableBoxes = () => {
for (let box of boxes) {
    box.disabled = true;
};
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
    };

const resetGame = () => {
    let turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    gameContainer.classList.remove("hide");
    resetBtn.classList.remove("hide");
    count = 0;
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is player${winner}`;
    msgContainer.classList.remove("hide");
    gameContainer.classList.add("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
};

gameDraw = () => {
    msg.innerText = "Game is a Draw";
    msgContainer.classList.remove("hide");
    gameContainer.classList.add("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            };
        };
    };
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.style.color = "#BA4F57";
            box.innerText = "O";
            turnO = false;
        } else {
            box.style.color = "#4B6B79";
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        console.log(count);

        let isWinner = checkWinner();
        if (count == 9 && !isWinner) {
            gameDraw();
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);