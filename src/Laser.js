import { options } from './options';

const colors = options.colors;
const W = options.W;
const W5 = options.W5;
const W10 = options.W10;
const H = options.H;

export function Laser(x, y) {
  this.x = x;
  this.y = y;
  this.s = options.laserSpeed;
  this.nx = this.x;
  this.ny = this.y;
  this.d = false;
}

Laser.prototype.draw = function() {
  drawFR(this.x, this.y, W10, W5, colors[6]);
};

Laser.prototype.move = function() {
  this.ny = this.y - this.s;
  const bricks = options.bricks[options.currentLvl];
  for (let i = bricks.length - 1; i >= 0; i -= 1) {
    if (rectColl(
      {x: this.x, y: this.y, w: W10, h: W5},
      {x: bricks[i].x, y: bricks[i].y, w: W, h: H})) {
      this.d = true;
      bricks[i].lives -= 1;
    }
  }
  this.y = this.ny;
};