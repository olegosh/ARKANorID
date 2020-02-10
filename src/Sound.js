export function Sound(src, vol) {
  this.src = src;
  this.vol = vol;
  this.elem = document.createElement('audio');
  this.elem.volume = this.vol;
  for (let i = 0; i < src.length; i += 1) {
    let source = document.createElement('source');
    source.src = src[i];
    this.elem.appendChild(source);
  }
  document.body.appendChild(this.elem);
}

Sound.prototype.setVolume = function(volume) {
  this.elem.volume = volume;
};

Sound.prototype.play = function() {
  this.elem.currentTime = 0;
  this.elem.play();
};

Sound.prototype.playLoop = function() {
  this.elem.loop = true;
  this.elem.play();
};

Sound.prototype.toggleLoop = function() {
  this.elem.loop = !this.elem.loop;
};

Sound.prototype.stop = function() {
  this.elem.pause();
  this.elem.currentTime = 0;
};

Sound.prototype.pause = function() {
  this.elem.pause();
};