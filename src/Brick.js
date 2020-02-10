import { options } from './options';
import { random } from './utils';

const colors = options.colors;
const W = options.W;
const H = options.H;
const H2 = options.H2;
const W5 = options.W5;
const W10 = options.W10;

export function Brick(x, y, type) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.lives = this.type === 'G' ? 6 : this.type === 'g' ? random(2, 5) : 1;
  this.deletable = false;
  this.c = this.defCP(this.type).c;
  this.p = this.defCP(this.type).p;
}

Brick.prototype.defCP = function(t) {
  let c = '#000000';
  let p = 0;
  switch (t) {
    case 'g': c = colors[14]; p = 9; break;
    case 'r': c = colors[15]; p = random(1, 8); break;
    case 'y': c = colors[16]; p = random(1, 7); break;
    case 'b': c = colors[17]; p = random(1, 6); break;
    case 'p': c = colors[18]; p = random(1, 5); break;
    case 'q': c = colors[19]; p = random(1, 4); break;
    case 'w': c = colors[20]; p = random(1, 3); break;
    case 'o': c = colors[21]; p = random(1, 2); break;
    case 'c': c = colors[22]; p = 1; break;
    case 'G': c = colors[23]; p = 10; break;
    default: c = '#ffffff';
  }
  return {c: c, p: p};
}

Brick.prototype.checkL = function() {
  if (this.lives <= 0) {
    this.deletable = true;
  }
};

Brick.prototype.draw = function() {
  drawFR(this.x, this.y, W, H, this.c);
  drawFR(this.x, this.y, W, H2, colors[34]);
  if (this.lives > 1 && this.lives < 6) {
    for (let i = 0; i < this.lives; i += 1) {
      drawFR(this.x + W10 + W5 * i, this.y + H2, W10, H2 / 2, colors[15]);
    }
  }
  if (this.lives > 1) {
    drawFR(this.x + W10, this.y + H - W10, W - W10, W10, colors[0]);
    drawFR(this.x + W - W10, this.y + W10, W10, H - W10, colors[0]);
  }
  //drawSR(this.x, this.y, W, H, colors[0]);
};