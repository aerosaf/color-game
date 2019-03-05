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
        this.easyButton.addEventListener("click", () => {
            this.setDifficulty('easy');
        });

        this.normalButton.addEventListener("click", () => {
            this.setDifficulty('normal');
        });

        this.hardButton.addEventListener("click", () => {
            this.setDifficulty('hard');
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
            this.displayNotification.style.color = "rgb(76, 196, 128)";
        } else {
            event.target.style.backgroundColor = "black";
            this.displayNotification.textContent = "Try Again!";
            this.displayNotification.style.color = "rgb(190, 53, 71)";
        }
    }

    changeColorAllSquare(color) {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].style.backgroundColor = color;
        }
    }

    setDifficulty(difficulty) {
        if (difficulty === 'easy' && (this.currentDifficulty === 9 || this.currentDifficulty === 12)) {
            this.easyButton.classList.add("active");
            this.normalButton.classList.remove("active");
            this.hardButton.classList.remove("active");
            this.reset();
        } else if (difficulty === 'normal' && (this.currentDifficulty === 6 || this.currentDifficulty === 12)) {
            this.easyButton.classList.remove("active");
            this.normalButton.classList.add("active");
            this.hardButton.classList.remove("active");
            this.reset();
        } else if (difficulty === 'hard' && (this.currentDifficulty === 6 || this.currentDifficulty === 9)) {
            this.easyButton.classList.remove("active");
            this.normalButton.classList.remove("active");
            this.hardButton.classList.add("active");
            this.reset();
        }
    }

    getCurrentDifficulty() {
        let active = document.querySelector(".active");
        if (active.id === 'easy') {
            this.currentDifficulty = 6;
        } else if (active.id === 'normal') {
            this.currentDifficulty = 9;
        } else if (active.id === 'hard') {
            this.currentDifficulty = 12
        }
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