const div = document.querySelector(".container");
const btn = document.querySelector(".submit");

// Painting and grid lines boolean values (toggle)
let paintingActive = true;
let gridActive = false;

// Default grid sizes
const gridSmall = 8;
const gridMedium = 16;
const gridLarge = 32;
// Variable (changing) grid size variable (binding)
const rows = 10;

// Max number os squares
const Max_squares = 100;
// Length of a hexadecimal string valu
const HEX_LENGTH = 6;
// List of hexadecimal characters
const hexCharacters = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// COLOR MODES
let singleColor = "singleColor";
let randomColor = "randomColor";
let grayScale = "grayScale";
let lightning = "lightning";
let shading = "shading";

// COLOR MODE
let colorMode = randomColor;
// Color selected for painting
let currentColor;

// Reference to the sketch container. Where the grid is draw
const sketchContainer = document.querySelector(".container");

// Size of Sketch container in px
const sketchSize = sketchContainer.offsetWidth;

// Generate grid of squares of height and width rows
function generateGrid(rows) {
  let squareSize = Math.floor(sketchSize / rows);
  for (let i = 0; i < rows * rows; i++) {
    let square = document.createElement("div");
    square.classList.toggle("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    if (gridActive) square.classList.toggle("outlined"); // essa parte faz o que?
    square.style.backgroundColor = "white";
    sketchContainer.appendChild(square);
  }
}

// Delete all existing squares
function deleteGrid() {
  let squares = document.querySelectorAll(".square");
  squares.forEach((sqr) => {
    sqr.remove();
  });
}

// Clear Grid. Make it Full White
function clearGrid() {
  let squares = document.querySelectorAll(".square");
  squares.forEach((sqr) => {
    sqr.style.backgroundColor = "white";
  });
}

// Generate Random  Color
function generateRandomColor(colorMode) {
  if (colorMode === grayScale) return getRandomGrayScale();
  else if (colorMode === randomColor) return getRandomColor();
}

// FIX RANDOM COLOR TO NOT BE THAT SOLID
// test here
function getRandomColor() {
  let hexColor = "#";
  for (let index = 0; index < HEX_LENGTH; index++) {
    let randomHexDigit = Math.floor(Math.random() * hexCharacters.length)
    hexColor += hexCharacters[randomHexDigit]
  }
  return hexColor;
}

// Min and max tones for grey Scale. so not black and white
// test here
const minGray = 3;
const maxGray = 14;
function getRandomGrayScale() {
    let hexColor='#';
    let randomHexDigit = getRandomIntInclusive(minGray, maxGray)
    for(let index = 0; index < HEX_LENGTH; index++) {
        hexColor += hexCharacters[randomHexDigit];
    }
}

// Painting active
// se clicar ele fica em true e pinta
// se clicar e ele estiver em true ele passa a ser false
// e não pinta mais
const contentDiv = document.querySelector('.content');
contentDiv.addEventListener('click', () => {
    if (paintingActive === true) paintingActive = false;
    else if (paintingActive === false) paintingActive = true;
})


// Mouse over event Listener 
//teste here
sketchContainer.addEventListener('mouseover', (event) => {
    if (colorMode === randomColor) {
        currentColor = generateRandomColor(colorMode);
    }
    else if (colorMode === grayScale){ 
        currentColor = generateRandomColor(colorMode);
    } 
    else if(colorMode === lightning) {
        currentColor = getlighterColor(event.target);
    }
    else if (colorMode === shading) {
        currentColor = getDarkerColor(event.target);
    }
    // else singlecolor. use the current color
    if (paintingActive) event.target.stye.backgroundColor = currentColor // acho que ele pega a cor atual
})

// PICK A COLOR USING RIGHT CLICK
// usa o chat pra entender isso aqui!
sketchContainer.addEventListener('conteextmenu', event => {
    let sqrColor = getComputedStyle(event.target).getPropertyValue('background-color');
    currentColor = sqrColor;
    colorMode = singleColor;
    // Change color picker value to be curernt color
    // isso é um regex?
    const sqrRGBMatch = sqrColor.match(/^rgba?\((\d+), (\d+), (\d+)(?:, (\d+))?\)$/);
    const rgbInt = sqrRGBMatch.slice(1).map(x => parseInt(x));
    pickColor.value = rgbToHex(rgbInt[0],rgbInt[1], rgbInt[2]);
    event.preventDefault();
})

// Darker Function
function getDarkerColor(sqr) {
    // reference sqr style properties
    const sqrStyles = getComputedStyle(sqr);
}