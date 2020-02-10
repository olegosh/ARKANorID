import { options } from './options';

const colors = options.colors;
const W = options.W;
const W2 = options.W2;
const W10 = options.W10;
const H = options.H;
const H2 = options.H2;
const player = options.player;

export function Capsule(x, y, t) {
  this.x = x;
  this.y = y;
  this.t = t;
  this.d = false;
  this.nx = this.x;
  this.ny = this.y;
  this.s = options.capsuleSpeed;
  this.c = this.defC(this.t);
}

Capsule.prototype.defC = function(t) {
  var c = '#FFFFFF';
  switch (t) {
    case 'E': c = colors[7]; break; //(E —— "expand")
    //- increases the platform by 2 times
    case 'D': c = colors[8]; break; //(D —— “divide”)
    //- 2 more balls fly out of the ball
    case 'L': c = colors[9]; break; //(L —— "laser")
    //- sets a laser machines on the platform that can destroy bricks with a laser
    case 'S': c = colors[10]; break; //(S —— "slow")
    //- slows the ball
    case 'B': c = colors[11]; break; //(B —— “breakthrough”)
    //- creates a portal on the right (or left) side, a transition to the next level
    case 'C': c = colors[12]; break; //(C —— “catch”)
    //- the ball now sticks to the platform
    case 'P': c = colors[13]; break; //(P —— “player”)
    //- it adds an extra life
  }
  return c;
};

Capsule.prototype.draw = function() {
  drawFR(this.x, this.y, W, H, this.c);
  drawFR(this.x, this.y, W, H2 / 2, colors[34]);
  drawFR(this.x + W10, this.y + H - W10, W - W10, W10, colors[6]);
  drawFT(this.t, this.x + W2 - H / 2 + W10, this.y + H - W10, colors[1], H);
};

Capsule.prototype.move = function() {
  this.ny = this.y + this.s;
  if(sidesColl(
      this.nx,
      this.ny,
      this.nx + W,
      this.ny + H,
      player.x,
      player.y,
      player.x + player.w,
      player.y + H)) {
        this.d = true;
        switch (this.t) {
          case 'E': changeState('expand'); break;
          case 'D': changeState('divide'); break;
          case 'L': changeState('laser'); break;
          case 'S': changeState('slow'); break;
          case 'B': changeState('breakthrough'); break;
          case 'C': changeState('catch'); break;
          case 'P': changeState('normal'); lives += 1; if(sounding) sounds.capsulePlayer.play(); break;
        }
  }
  this.y = this.ny;
};