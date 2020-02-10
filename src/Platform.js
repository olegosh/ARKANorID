import { options } from './options';

export function Platform(x, y) {
  this.x = x;
  this.y = y;
  this.s = options.platformSpeed;
  this.d = 0;
  this.nx = this.x;
  this.ny = this.y;
  this.expandable = true;
  this.w = options.W * 2;
  this.armed = false;
}

Platform.prototype.setSpeed = function(speed) {
  this.s = speed;
};

Platform.prototype.setX = function(x) {
  this.x = x;
};

Platform.prototype.setW = function(w) {
  this.w = w;
};

Platform.prototype.draw = function() {
  if (this.armed) {
    //drawSR(this.x, this.y, this.w, options.H, options.colors[0]);
    drawFR(this.x, this.y, this.w, options.H, options.colors[5]);
    drawFR(this.x, this.y, this.w, options.H2, options.colors[34]);
    drawFR(
      this.x + this.w / 8,
      this.y + options.H / 2,
      this.w / 4,
      options.H / 2,
      options.colors[2]
    );
    drawFR(
      this.x + this.w - this.w / 8 - this.w / 4,
      this.y + options.H / 2,
      this.w / 4,
      options.H / 2,
      options.colors[2]
    );
    //drawSR(
      //this.x + this.w / 4 - options.W10 / 2,
      //this.y - options.W10,
      //options.W10,
      //options.H + options.W10,
      //options.colors[2]
    //);
    //drawSR(
      //this.x + this.w - this.w / 4 - options.W10 / 2,
      //this.y - options.W10,
      //options.W10,
      //options.H + options.W10,
      //options.colors[2]
    //);
    drawFR(
      this.x + this.w / 4 - options.W10 / 2,
      this.y - options.W10,
      options.W10,
      options.H + options.W10,
      options.colors[2]
    );
    drawFR(
      this.x + this.w - this.w / 4 - options.W10 / 2,
      this.y - options.W10,
      options.W10,
      options.H + options.W10,
      options.colors[2]
    );
  } else {
    //drawSR(this.x, this.y, this.w, options.H, options.colors[0]);
    drawFR(this.x, this.y, this.w, options.H, options.colors[5]);
    drawFR(this.x, this.y, this.w, options.H2, options.colors[34]);
  }
};

Platform.prototype.move = function() {
  if (options.keys['left']) {
    this.d = -1;
    this.s = options.platformSpeed;
  }
  if (options.keys['right']) {
    this.d = 1;
    this.s = options.platformSpeed;
  }
  if (!options.keys['right'] && !options.keys['left']) {
    this.d = this.s = 0;
  }
  this.nx = this.x + this.d * this.s;
  if (options.portals.length) {
    let lastPortal = options.portals[options.portals.length - 1];
    if (sidesColl(
      this.nx,
      this.ny,
      this.nx + this.w,
      this.ny + options.H,
      lastPortal.x - options.H,
      lastPortal.y,
      lastPortal.x + options.W,
      lastPortal.y + options.H * 3)) {
        if (options.sounding) {
          options.sounds.portal.play();
        }
        lastPortal.deletable = true;
        options.bricks[options.currentLvl].length = 0;
    }
  }
  if (this.nx <= options.W || this.nx >= options.SW + options.W - this.w) {
    return;
  }
  this.x = this.nx;
};