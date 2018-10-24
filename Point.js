eq = x => 0.3 * x + 0.1;

class Point {
  constructor(x_, y_) {
    this.x = x_ || random(-1, 1);
    this.y = y_ || random(-1, 1);
    this.bias = 1;
    let lineY = eq(this.x);
    if (this.y > lineY) {
      this.label = 1;
    } else {
      this.label = -1;
    }
  }

  pixelX() {
    return map(this.x, -1, 1, 0, width);
  }

  pixelY() {
    return map(this.y, -1, 1, height, 0);
  }

  show() {
    stroke(0);
    fill(0)

    if (this.label == 1) {
      fill(255);
    } else {
      fill(0);
    }

    let px = this.pixelX();
    let py = this.pixelY();
    ellipse(px, py, 8, 8);
  }
}
