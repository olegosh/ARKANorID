import { options } from './options';

export function Portal(x, y) {
  this.x = x;
  this.y = y;
  this.deletable = false;
}

Portal.prototype.draw = function() {
  drawFR(this.x, this.y, options.H, options.H * 3, options.colors[29]);
  drawFR(this.x + options.W10, this.y, options.W10, options.H * 3, options.colors[30]);
  drawFR(this.x + options.H / 2 - options.W10 / 2, this.y, options.W10, options.H * 3, options.colors[30]);
  drawFR(this.x + options.H - options.W10 * 2, this.y, options.W10, options.H * 3, options.colors[30]);
};