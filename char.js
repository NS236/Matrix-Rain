const minBrightness = 0.1;
const mutationRate = 0.02;
class Char {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.char = (i % 3) ? randomChar() : randomBin();
    this.brightness = minBrightness;
    this.decrease = 0.005 + Math.random() / 90;
  }

  show() {
    ctx.textAlign = "center";
    ctx.font = `bold ${charSize}px monospace`;
    ctx.fillStyle = `rgba(0, 255, 0, ${this.brightness})`
    ctx.fillText(this.char, this.x, this.y);
  }

  randomize() {
    this.char = (this.i % 3) ? randomChar() : randomBin();
  }

  illuminate() {
    this.brightness = 1;
    this.decrease = 0.005 + Math.random() / 90;
  }

  fade() {
    if(this.brightness > minBrightness) {
      this.brightness -= this.decrease;
    } else {
      this.brightness = minBrightness;
    }
     
  }
}
