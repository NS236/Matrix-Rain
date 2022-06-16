const canvas = fullscreenCanvas();
const ctx = canvas.getContext("2d");

const charList = "αβεζξλμΣςσϡψΨΧΦΩϜΆᾅῈἐἥὋῩΏϞϏϗϛϰϖͽͲæʤʣʩɚĦʯĮĳʞʪɮʫɰɸøŒœʠßʂŦʧʨʦǘʉʒʭʬŹʘʑʓ∂∉⨚⨔";
const binList = "01";
const charSize = 18;

function randomChar() {
  return charList[Math.floor(Math.random() * charList.length)];
}

function randomBin() {
  return binList[Math.floor(Math.random() * binList.length)];
}

let cols, rows;

let chars, nrgs;

let frameCount = 0;

function runProgram() {
  cols = Math.floor(window.innerWidth / charSize) + 1;
  rows = Math.floor(window.innerHeight / charSize) + 1;

  chars = [];
  nrgs = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      chars.push(new Char(i * charSize + charSize / 2, j * charSize + charSize / 2, i));
    }
  }

  for (let i = 0; i < cols * 3 / 4; i++) {
    nrgs.push(new NRG());
  }

  (function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    for (const char of chars) {
      char.show();
      char.fade();
      if (Math.random() < mutationRate) {
        char.randomize();
      }
    }

    for (const nrg of nrgs) {
      nrg.move();
      nrg.light();
    }


    frameCount++;
    window.requestAnimationFrame(draw);
  })();
}

runProgram();

window.document.body.addEventListener("mouseup", () => {
  canvas.requestFullscreen();
});

window.addEventListener("resize", () => {
  runProgram();
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

  // let cols = Math.floor(window.innerWidth / charSize) + 1;
  // let rows = Math.floor(window.innerHeight / charSize) + 1;

  // chars.length = 0;
  // nrgs.length = 0;
  // for (let j = 0; j < rows; j++) {
  //   for (let i = 0; i < cols; i++) {
  //     chars.push(new Char(i * charSize + charSize / 2, j * charSize + charSize / 2));
  //   }
  // }

  // for (let i = 0; i < cols * 3 / 4; i++) {
  //   nrgs.push(new NRG());
  // }
});
