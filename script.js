const canvas = fullscreenCanvas();
const ctx = canvas.getContext("2d");

const charSize = 18;

let charList = "0123456789" + "abcdefghijklmnopqrstuvwxyz";

for (let i = 0; i < (97 - 47); i++) {
  charList += String.fromCharCode(0x30A0 + i);
}
for (let i = 0; i < (90 - 47); i++) {
  charList += String.fromCharCode(0x3040 + i);
}
for (let i = 0; i < 9; i++) {
  charList += String.fromCharCode(0x0660 + i);
}

function randomChar() {
  return charList[Math.floor(Math.random() * charList.length)];
}

let cols, rows;

let chars, nrgs, nrg2s;

let frameCount = 0;

const rainTime = 60 * 20;

function runProgram() {
  frameCount = 0;

  cols = Math.floor(window.innerWidth / charSize) + 1;
  rows = Math.floor(window.innerHeight / charSize) + 1;

  chars = [];
  nrgs = [];
  nrg2s = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      chars.push(new Char(i * charSize + charSize / 2, j * charSize + charSize / 2));
    }
  }

  for (let i = 0; i < cols * 3 / 4; i++) {
    nrgs.push(new NRG());
  }

  (function draw() {
    ctx.resetTransform();
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.translate(window.innerWidth, 0);
    ctx.scale(-1, 1);

    for (const char of chars) {
      char.show();
      char.fade();
      if (Math.random() < mutationRate) {
        char.randomize();
      }
    }

    maxBrightness = Math.min(frameCount / 60, 3)

    for (let i = nrgs.length - 1; i >= 0; i--) {
      nrgs[i].move();
      if (nrgs[i].offscreen()) {
        if (frameCount < rainTime || Math.random() < 0.1) {
          nrgs[i].reset();
        } else {
          nrgs.splice(i, 1);
          continue;
        }
      }
      nrgs[i].light();
    }

    if (frameCount == rainTime) {
      let x = Math.floor(cols / 2) - 5;
      let y = Math.floor(rows / 2);
      let title = ["X", "I", "Я", "T", "A", "M", "Ǝ", "H", "T"];
      for (let i = 0; i < title.length; i++) {
        nrg2s.push(new NRG2(x, y, title[i]));
        x += 1 + (i == 5);
      }
    }

    if (frameCount > rainTime) {
      minBrightness -= 0.0001;
    }

    if (frameCount > rainTime * 1.5) {
      nrg2s.length = 0;
    }

    for (const nrg2 of nrg2s) {
      nrg2.move();
      nrg2.light();
    }

    frameCount++;
    if(frameCount < rainTime * 1.75) {
      window.requestAnimationFrame(draw);
    } else {
      runProgram();
    }
  })();
}

runProgram();

window.document.body.addEventListener("mouseup", () => {
  canvas.requestFullscreen();
});

window.addEventListener("resize", () => {
  runProgram();
});
