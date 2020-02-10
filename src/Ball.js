import { options } from './options';
import { dtr, rtd } from './utils';

const W = options.W;
const H = options.H;
const SW = options.SW;
const SH = options.SH;
const player = options.player;
const angleInc = options.angleInc;
const keys = options.keys;

export function Ball(x, y, s) {
  this.x = x;
  this.y = y;
  this.sticky = s ? true : false;
  this.s = options.ballSpeed;
  this.dx = 1;
  this.dy = -1;
  this.nx = this.x;
  this.ny = this.y;
  this.deletable = false;
  this.a = dtr(45);
  this.stickable = false;
}

Ball.prototype.setSpeed = function(speed) {
  this.s = speed;
};

Ball.prototype.draw = function() {
  drawSC(this.x, this.y, H / 2 - options.W10, options.colors[0]);
  drawFC(this.x, this.y, H / 2 - options.W10, options.colors[6]);
};

Ball.prototype.calculateIndex = function(a) {
  let deg = rtd(a);
  let times = Math.round(deg / angleInc);
  let index = times - 1;
  return index;
};

Ball.prototype.move = function() {
  this.a %= Math.PI * 2;
  if (this.a < 0) {
    this.a += Math.PI * 2;
  }
  if (!this.sticky) {
    let index = this.calculateIndex(this.a);
    this.nx = this.x + this.dx * this.s * options.anglesCos[index];
    this.ny = this.y + this.dy * this.s * options.anglesSin[index];
    if (wallColl(
      this.nx - H / 2,
      this.ny - H / 2,
      this.nx + H / 2,
      this.ny + H / 2,
      W,
      W,
      SW + W,
      SH + W) === 'x') {
        this.dx = -this.dx;
    }
    if (wallColl(
      this.nx - H / 2,
      this.ny - H / 2,
      this.nx + H / 2,
      this.ny + H / 2,
      W,
      W,
      SW + W,
      SH + W) === 'y') {
        this.dy = -this.dy;
    }
    if (wallColl(
      this.nx - H / 2,
      this.ny - H / 2,
      this.nx + H / 2,
      this.ny + H / 2,
      W,
      W,
      SW + W,
      SH + W) === 'z') {
        this.deletable = true;
    }
    let bricks = options.bricks[options.currentLvl];
    for (let i = bricks.length - 1; i >= 0; i -= 1) {
      if (rectColl(
          {x: this.nx - H / 2, y: this.ny - H / 2, w: H / 2, h: H / 2},
          {x: bricks[i].x, y: bricks[i].y, w: W, h: H}) === 'left' ||
        rectColl(
          {x: this.nx - H / 2, y: this.ny - H / 2, w: H / 2, h: H / 2},
          {x: bricks[i].x, y: bricks[i].y, w: W, h: H}) === 'right') {
            this.dx = -this.dx;
            bricks[i].lives -= 1;
            if (sounding) {
              options.sounds.brickDamaged.play();
            }
            break;
      } else if (rectColl(
                  {x: this.nx - H / 2, y: this.ny - H / 2, w: H / 2, h: H / 2},
                  {x: bricks[i].x, y: bricks[i].y, w: W, h: H}) === 'bottom' ||
                rectColl(
                  {x: this.nx - H / 2, y: this.ny - H / 2, w: H / 2, h: H / 2},
                  {x: bricks[i].x, y: bricks[i].y, w: W, h: H}) === 'top') {
                    this.dy = -this.dy;
                    bricks[i].lives -= 1;
                    if (sounding) {
                      options.sounds.brickDamaged.play();
                    }
                    break;
      }
    }
    if (this.stickable && rectColl(
        {x: this.nx - H / 2, y: this.ny - H / 2, w: H / 2, h: H / 2},
        {x: player.x - H / 4, y: player.y - H / 4, w: player.w + H / 4, h: H + H / 4})) {
          this.sticky = true;
          return;
    }
    if (rectColl(
        {x: this.nx - H / 2, y: this.ny - H / 2, w: H / 2, h: H / 2},
        {x: player.x, y: player.y, w: player.w, h: H}) === 'left' ||
      rectColl(
        {x: this.nx - H / 2, y: this.ny - H / 2, w: H / 2, h: H / 2},
        {x: player.x, y: player.y, w: player.w, h: H}) === 'right') {
          this.dx = -this.dx;
          this.y -= H;
          this.dy = -this.dy;
          if (keys['right'] && this.dx < 0) {
            this.a -= dtr(angleInc * 2);
          } else if (keys['right'] && this.dx > 0) {
            this.a += dtr(angleInc * 2);
          }
          if (keys['left'] && this.dx > 0) {
            this.a += dtr(angleInc * 2);
          } else if (keys['left'] && this.dx < 0) {
            this.a -= dtr(angleInc * 2);
          }
    }
    if (rectColl(
        {x: this.x, y: this.y, w: H / 2, h: H / 2},
        {x: player.x, y: player.y, w: player.w, h: H}) === 'bottom' ||
      rectColl(
        {x: this.x, y: this.y, w: H / 2, h: H / 2},
        {x: player.x, y: player.y, w: player.w, h: H}) === 'top') {
          this.dy = -this.dy;
          if (keys['right'] && this.dx < 0) {
            this.dx = -this.dx;
            this.a -= dtr(angleInc);
          } else if (keys['right'] && this.dx > 0) {
            this.a += dtr(angleInc);
          }
          if (keys['left'] && this.dx > 0) {
            this.dx = -this.dx;
            this.a += dtr(angleInc);
          } else if (keys['left'] && this.dx < 0) {
            this.a -= dtr(angleInc);
          }
    }
    let index = this.calculateIndex(this.a);
    this.nx = this.x + this.dx * this.s * options.anglesCos[index];
    this.ny = this.y + this.dy * this.s * options.anglesSin[index];
    this.x = this.nx;
    this.y = this.ny;
  }
  if (this.sticky) {
    if (keys['left']) {
      this.dx = -1;
      this.s = player.s;
    }
    if (keys['right']) {
      this.dx = 1;
      this.s = player.s;
    }
    if (!keys['right'] && !keys['left']) this.dx = this.s = 0;
    this.nx = this.x + this.dx * this.s;
    if (this.nx - H / 2 <= W || this.nx - H / 2 >= SW + W - H) return;
    this.x = this.nx;
  }
  this.checkE();
  this.checkZ();
  this.correctA();
  this.leave();
};

Ball.prototype.checkE = function() {
  if (this.x < 0 || this.y < 0 || this.x > width || this.y > height) {
    this.deletable = true;
  }
};

Ball.prototype.checkZ = function() {
  if (wallColl(
    this.x - H / 4,
    this.y - H / 4,
    this.x + H / 4,
    this.y + H / 4,
    player.x,
    player.y,
    player.w,
    H) === 'z') {
      this.y -= H;
  }
};

Ball.prototype.correctA = function() {
  if (Math.abs(rtd(this.a)) <= 10 || Math.abs(rtd(this.a)) >= 350 || (Math.abs(rtd(this.a)) > 170 && Math.abs(rtd(this.a)) < 190)) {
    this.a = Math.random(0, 1) ? this.a + dtr(angleInc) : this.a - dtr(angleInc);
    this.y -= H;
  }
};

Ball.prototype.leave = function() {
  if (this.y < player.y) {
    return;
  }
  if (isNaN(this.x) || isNaN(this.y)) {
    this.y = this.ny = player.y - H * 2;
    this.x = this.nx = SW / 2;
  }
};