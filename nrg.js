class NRG {
  constructor() {
    this.x = Math.floor(Math.random() * cols);
    this.y = Math.floor(Math.random() * rows);
    this.speed = Math.floor(2 + Math.random() * 3);
  }

  reset() {
    this.x = Math.floor(Math.random() * cols);
    this.y = 0;
    this.speed = Math.floor(2 + Math.random() * 3);
  }

  move() {
    if (frameCount % this.speed == 0) {
      this.y++;
    }

  }

  offscreen() {
    return this.y >= rows;
  }

  light() {
    const index = this.x + this.y * cols;
    // console.log("x", this.x, cols);
    // console.log("y", this.y, rows);
    // console.log(index, chars.length);
    chars[index].illuminate();
  }
}

class NRG2 extends NRG {
  constructor(dx, dy, char) {
    super();
    this.dx = dx;
    this.dy = dy;
    this.x = this.dx;
    // this.y = 0;
    this.speed = Math.floor(5 + Math.random() * 10);
    this.arrived = false;
    this.char = char;
  }

  reset() {
    this.y = 0;
    this.speed = Math.floor(5 + Math.random() * 10);
  }

  move() {
    if (frameCount % this.speed == 0 && !this.arrived) {
      this.y++;
      if (this.y == this.dy) {
        this.arrived = true;
        const index = this.x + this.y * cols;
        chars[index].char = this.char;
        chars[index].static = true;
        chars[index].decrease = 0.02 + ((Math.random() * 2) ** 2 / 100);
      }
    }
    if (this.offscreen()) {
      this.reset();
    }
  }
}
