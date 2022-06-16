class NRG {
  constructor() {
    this.x = Math.floor(Math.random() * cols);
    this.y = Math.floor(Math.random() * rows);
    this.speed = Math.floor(2 + Math.random() * 8);
  }

  reset() {
    this.x = Math.floor(Math.random() * cols);
    this.y = 0;
    this.speed = Math.floor(2 + Math.random() * 8);
  }

  move() {
    if (frameCount % this.speed == 0) {
      this.y++;
      if (this.offscreen()) {
        this.reset();
      }
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