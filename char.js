let minBrightness = 0.1;
let maxBrightness = 3;
const mutationRate = 0.02;
class Char {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.char = randomChar();
    this.brightness = minBrightness;
    this.decrease = 0.05 + Math.random() / 100;
    this.static = false;
  }

  show() {
    ctx.textAlign = "center";
    ctx.shadowColor = "#fff";
    ctx.font = `bold ${charSize}px monospace`;
    if (this.brightness > maxBrightness - 0.25) {
      ctx.shadowBlur = 15;
      ctx.fillStyle = `rgba(180, 255, 200, ${this.brightness})`
    } else if (!this.static) {
      ctx.shadowBlur = Math.floor(this.brightness * 2);
      ctx.fillStyle = `rgba(0, 225, 50, ${this.brightness})`
    } else {
      ctx.shadowBlur = Math.floor(this.brightness * 5);
      ctx.fillStyle = `rgba(180, 255, 200, ${this.brightness})`
    }
    ctx.fillText(this.char, this.x, this.y);
  }

  randomize() {
    if (!this.static) {
      this.char = randomChar();
    }
  }

  illuminate() {
    this.brightness = maxBrightness;
    if (!this.static) {
      this.decrease = 0.05 + Math.random() / 100;
    }
  }

  fade() {
    if (this.brightness > minBrightness) {
      this.brightness -= this.decrease;
    } else {
      this.brightness = minBrightness;
    }

  }
}
