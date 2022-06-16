const minBrightness = 0.05;
const mutationRate = 0.02;
class Char {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.char = randomChar();
    this.brightness = minBrightness;
    this.decrease = 0.05 + Math.random() / 100;
  }

  show() {
    ctx.textAlign = "center";
    ctx.shadowColor = "#fff";
    ctx.font = `bold ${charSize}px monospace`;
    if(this.brightness > 2.75) {
      ctx.shadowBlur = 15;
      ctx.fillStyle = `rgba(180, 255, 200, ${this.brightness})`
    } else {
      ctx.shadowBlur = Math.floor(this.brightness * 2);
      ctx.fillStyle = `rgba(0, 225, 50, ${this.brightness})`
    }
    ctx.fillText(this.char, this.x, this.y);
  }

  randomize() {
    this.char = randomChar();
  }

  illuminate() {
    this.brightness = 3;
    this.decrease = 0.05 + Math.random() / 100;
  }

  fade() {
    if(this.brightness > minBrightness) {
      this.brightness -= this.decrease;
    } else {
      this.brightness = minBrightness;
    }
     
  }
}
