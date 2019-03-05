class ColorGame {

    constructor(
        container,
        colors,
        currentColor,
        squares,
        displayCurrentColor,
        displayNotification,
        headerH1,
        resetButton,
        currentDifficulty,
        pickedColor
    ) {
        this.getCurrentDifficulty();
        this.createElementsSquare();
        this.createRandomColor()
        this.setGameElement();
        this.displayColorStage();
        this.setEventHandler();
    }

    createElementsSquare() {
        let squares = document.createElement("div");
        squares.classList = "squares";

        for (let i = 0; i < this.currentDifficulty; i++) {
            let square = document.createElement("div");
            square.classList = "square";
            squares.appendChild(square);
        }

        this.container = document.querySelector(".container");
        this.container.appendChild(squares);
    }

    createRandomColor() {
        this.colors = [];
        for (let i = 0; i < this.currentDifficulty; i++) {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            let rgbColor = "rgb(" + red + ", " + green + ", " + blue + ")";
            this.colors.push(rgbColor);
        }
        this.pickRandomColor();
    }

    pickRandomColor() {
        this.currentColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    setGameElement() {
        /** @type {HTMLElement} */
        this.squares = document.querySelectorAll(".square");
        this.displayCurrentColor = document.querySelector("#currentColor");
        this.displayNotification = document.querySelector("#notification");
        this.headerH1 = document.querySelector("h1");
        this.resetButton = document.querySelector("#new-colors");
        this.easyButton = document.querySelector("#easy");
        this.normalButton = document.querySelector("#normal");
        this.hardButton = document.querySelector("#hard");
        this.pickedColor = null;
    }

    displayColorStage() {
        this.displayCurrentColor.textContent = this.currentColor;
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].style.backgroundColor = this.colors[i];
            this.squares[i].addEventListener('click', (event) => {
                this.userPick(event)
            });
        }
    }

    setEventHandler() {
        this.easyButton.addEventListener("click", (event) => {
            this.setDifficulty(event.target.getAttribute("value"));
        });

        this.normalButton.addEventListener("click", () => {
            this.setDifficulty(event.target.getAttribute("value"));
        });

        this.hardButton.addEventListener("click", () => {
            this.setDifficulty(event.target.getAttribute("value"));
        });

        this.resetButton.addEventListener("click", () => {
            this.reset();
        });
    }

    userPick(event) {
        this.pickedColor = event.target.style.backgroundColor;
        if (this.pickedColor === this.currentColor) {
            this.changeColorAllSquare(this.pickedColor);
            this.headerH1.style.backgroundColor = this.pickedColor;
            this.displayNotification.textContent = "Correct!";
            this.displayNotification.style.color = "rgb(94, 239, 129)";
        } else {
            event.target.style.backgroundColor = "black";
            this.displayNotification.textContent = "Try Again!";
            this.displayNotification.style.color = "rgb(251, 40, 24)";
        }
    }

    changeColorAllSquare(color) {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].style.backgroundColor = color;
        }
    }

    setDifficulty(difficulty) {
        if (this.currentDifficulty !== difficulty) {
            let currentActiveButton = document.querySelector(".active");
            currentActiveButton.classList.remove("active");
            document.querySelector("[value=\"" + difficulty + "\"]").classList.add("active");
            this.reset();
        }
    }

    getCurrentDifficulty() {
        let active = document.querySelector(".active");
        this.currentDifficulty = active.getAttribute("value");
    }

    reset() {
        this.headerH1.style.backgroundColor = "black";
        this.displayNotification.textContent = "";
        this.container.innerHTML = "";

        this.getCurrentDifficulty();
        this.createElementsSquare();
        this.createRandomColor();
        this.setGameElement();
        this.displayColorStage();
        this.displayCurrentColor.textContent = this.currentColor;
    }
}

let start = new ColorGame();