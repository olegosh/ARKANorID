import { options } from './options';
import { random } from './utils';
import { sidesColl } from './collisions';
import { drawFR, drawFT } from './draw';
import { Ball } from './Ball';
import { Portal } from './Portal';

const colors = options.colors;
const SW = options.SW;
const SH = options.SH;
const W = options.W;
const W2 = options.W2;
const W10 = options.W10;
const H = options.H;
const H2 = options.H2;
const player = options.player;
const sounding = options.sounding;
const sounds = options.sounds;
const portals = options.portals;
const balls = options.balls;

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
  const colors = options.colors;
  let c = '#FFFFFF';
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
  const W = options.W;
  const W2 = options.W2;
  const W10 = options.W10;
  const H = options.H;
  const H2 = options.H2;
  const colors = options.colors;
  drawFR(this.x, this.y, W, H, this.c);
  drawFR(this.x, this.y, W, H2 / 2, colors[34]);
  drawFR(this.x + W10, this.y + H - W10, W - W10, W10, colors[6]);
  drawFT(this.t, this.x + W2 - H / 2 + W10, this.y + H - W10, colors[1], H);
};

Capsule.prototype.move = function() {
  const player = options.player;
  const W = options.W;
  const H = options.H;
  this.ny = this.y + this.s;
  if (sidesColl(
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
          case 'P': changeState('normal'); options.lives += 1; if(options.sounding) options.sounds.capsulePlayer.play(); break;
        }
  }
  this.y = this.ny;
};

export function changeState(state) {
  const player = options.player;
  const balls = options.balls;
  const portals = options.portals;
  const W = options.W;
  const H = options.H;
  const SW = options.SW;
  const SH = options.SH;
  if (state === 'expand') {
    if (sounding) {
      sounds.capsuleExpand.play();
    }
    changeState('normal');
    if (player.expandable) {
      if (player.x <= SW / 2) {
        player.setW(W * 4);
        player.expandable = false;
      } else {
        player.setX(player.x - W * 2);
        player.setW(W * 4);
        player.expandable = false;
      }
    }
  } else if (state === 'divide') {
    if (sounding) {
      sounds.capsuleDivide.play();
    }
    changeState('normal');
    let x = balls[balls.length - 1].x;
    let y = balls[balls.length - 1].y;
    let a = balls[balls.length - 1].a;
    let add = true;
    for (let i = balls.length - 1; i >= 0; i -= 1) {
      if (balls[i].y > player.y + H || balls[i].sticky) {
        add = false;
        points += factor;
      }
    }
    if (add) {
      balls.push(new Ball(x, y, false));
      balls.push(new Ball(x, y, false));
    }
    if (balls[balls.length - 1]) balls[balls.length - 1].a = a + 0.2;
    if (balls[balls.length - 2]) balls[balls.length - 2].a = a - 0.2;
  } else if (state === 'laser') {
    if (sounding) {
      sounds.capsuleLaser.play();
    }
    changeState('normal');
    player.armed = true;
  } else if (state === 'slow') {
    if (sounding) {
      sounds.capsuleSlow.play();
    }
    changeState('normal');
    for (let i = balls.length - 1; i >= 0; i -= 1) {
      balls[i].setSpeed(options.ballSpeed / 2);
    }
    player.setSpeed(options.platformSpeed / 2);
  } else if (state === 'breakthrough') {
    if (sounding) {
      sounds.capsuleBreakthrough.play();
    }
    changeState('normal');
    if (!portals.length) {
      if (random(0, 1)) {
        portals.push(new Portal(SW + W, SH - H * 2));
      } else {
        portals.push(new Portal(H, SH - H * 2));
      }
    }
  } else if (state === 'catch') {
    if (sounding) {
      sounds.capsuleCatch.play();
    }
    changeState('normal');
    for (let i = balls.length - 1; i >= 0; i -= 1) {
      balls[i].stickable = true;
    }
  } else if (state === 'normal') {
    for (let i = balls.length - 1; i >= 0; i -= 1) {
      if (balls[i]) balls[i].setSpeed(options.ballSpeed);
      if (balls[i]) balls[i].stickable = false;
      if (balls[i]) balls[i].sticky = false;
    }
    player.setSpeed(options.platformSpeed);
    player.armed = false;
    player.setW(W * 2);
    player.expandable = true;
  }
}