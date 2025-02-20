const grid = document.querySelector("#grid");

function createGrid(gridSize) {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    const pixelSize = Math.round(960 / gridSize);
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.flexDirection = "row";
        for (let j = 0; j < gridSize; j++) {
            const square = document.createElement("div");
            square.className = "pixel";
            square.style.height = `${pixelSize}px`;
            square.style.width = `${pixelSize}px`;
            square.id = `${i+1}x${j+1}`;
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
    checkPixel();
}

function checkPixel() {
    const pixels = document.querySelectorAll(".pixel");

    pixels.forEach(element => element.addEventListener('mouseover', event => {
    setColor(element);
    increaseOpacity(element);
    }))
}

function increaseOpacity(element) {
    const styles = window.getComputedStyle(element);
    let opacity = styles.getPropertyValue("opacity");
    if (opacity < 1) {
        opacity = String(Number(opacity) + 0.1);
        element.style.opacity = opacity;
    }
}

function drawColor() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`
}

function setColor(element) {
    const styles = window.getComputedStyle(element);
    let color = styles.getPropertyValue("background-color");
    if (color == "rgb(211, 211, 211)") {
        color = drawColor();
        element.style.backgroundColor = color;
    }
}

createGrid(16);

const newGrid = document.querySelector("#create-new-grid");
const newGridButton = document.createElement('button');
newGridButton.textContent = "Create new grid";
newGrid.appendChild(newGridButton);

newGridButton.addEventListener('click', () => {
    const sideSize = prompt("What size of grid do you want?");
    if (sideSize < 1) {
        sideSize = prompt("Size can't be smaller than 1.");
    } else if (sideSize > 100) {
        sideSize = prompt("Maximum size is 100.");
    } else {
        createGrid(sideSize);
    }
})