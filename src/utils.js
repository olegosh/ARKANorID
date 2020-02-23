import { options } from './options';
import { soundSrc } from './sounds';
import { Sound } from './sound';
import { rectColl } from './collisions';

export function createSounds() {
  for (let s in soundSrc) {
    options.sounds[s] = new Sound(
      [
        soundSrc[s][0],
        soundSrc[s][1],
        soundSrc[s][2]
      ],
      options.volume
    );
  }
}

export function setVol() {
  for (let i = 0; i < options.vols.length; i += 1) {
    if (options.vols[i].checked) {
      options.volume = Number(options.vols[i].dataset.value);
    }
  }
  for (let s in options.sounds) {
    options.sounds[s].setVolume(options.volume);
  }
  playBtnSnd();
}

export function checkSounds() {
  if(!options.sounding) {
    let lastVol = options.volume;
    for (let s in options.sounds) {
      options.sounds[s].setVolume(0.0);
    }
    options.sounds.ballFlyaway.play();
    options.sounds.brickDamaged.play();
    options.sounds.brickDestroyed.play();
    options.sounds.capsuleBreakthrough.play();
    options.sounds.capsuleCatch.play();
    options.sounds.capsuleDivide.play();
    options.sounds.capsuleExpand.play();
    options.sounds.capsuleLaser.play();
    options.sounds.capsulePlayer.play();
    options.sounds.capsuleSlow.play();
    options.sounds.laserShoot.play();
    //options.sounds.menu.play();
    //options.sounds.menuBtn.play();
    options.sounds.newLvl.play();
    options.sounds.portal.play();
    setTimeout(function() {
      for (let s in options.sounds) {
        options.sounds[s].setVolume(lastVol);
      }
    }, 1E3, lastVol);
  }
}

export function playBtnSnd() {
  if(options.sounding) {
    options.sounds.menuBtn.play();
  }
}

export function showAndHide(show, hide) {
  if (show) {
    show.style.display = 'block';
  }
  if (hide.length) {
    for (let i = 0; i < hide.length; i += 1) {
      hide[i].style.display = 'none';
    }
  } else {
    hide.style.display = 'none';
  }
}

export function calcProbability(threshold) {
  let rnd = random(0, threshold);
  let leftChanceRng = Math.floor(threshold / 2) - Math.floor(threshold / 20);
  let rightChanceRng = Math.floor(threshold / 2) + Math.floor(threshold / 20);
  if (rnd >= leftChanceRng && rnd <= rightChanceRng) {
    return true;
  }
  return false;
}

export function down(e) {
  if (e) {
    e.preventDefault();
  }
  if (options.tilting) {
    if (e.keyCode && e.keyCode === 38) {
      options.keys.fire = true;
      return;
    }
  }
  if (e.keyCode && !options.tilting) {
    switch (e.keyCode) {
      case 37: options.keys.left = true; break;
      case 38: options.keys.fire = true; break;
      case 39: options.keys.right = true; break;
    }
    return;
  }
  if (options.tilting) {
    if (e.target.id === 'fire') {
      options.keys.fire = true;
      e.target.style.backgroundColor = options.colors[3];
    }
  }
  if (!options.tilting) {
    switch (e.target.id) {
      case 'left': options.keys.left = true; break;
      case 'fire': options.keys.fire = true; break;
      case 'right': options.keys.right = true; break;
    }
    e.target.style.backgroundColor = options.colors[3];
  }
}

function drawFR(x, y, w, h, c, ctx) {
  if (ctx) {
    ctx.save();
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  } else {
    options.context.save();
    options.context.fillStyle = c;
    options.context.fillRect(x, y, w, h);
    options.context.restore();
  }
}

function Laser(x, y) {
  this.x = x;
  this.y = y;
  this.s = options.laserSpeed;
  this.nx = this.x;
  this.ny = this.y;
  this.d = false;
}

Laser.prototype.draw = function() {
  drawFR(this.x, this.y, options.W10, options.W5, options.colors[6]);
};

Laser.prototype.move = function() {
  this.ny = this.y - this.s;
  const bricks = options.bricks[options.currentLvl];
  for (let i = bricks.length - 1; i >= 0; i -= 1) {
    if (rectColl(
      {x: this.x, y: this.y, w: options.W10, h: options.W5},
      {x: bricks[i].x, y: bricks[i].y, w: options.W, h: options.H})) {
      this.d = true;
      bricks[i].lives -= 1;
    }
  }
  this.y = this.ny;
};

function addLaser(code, id) {
  if ((code === 38 || id === 'fire') && options.player.armed) {
    if (random(0, 1)) {
      options.lasers.push(new Laser(
        options.player.x + options.player.w / 4 - options.W10 / 2,
        options.player.y - options.W10
      ));
      if (options.sounding) {
        options.sounds.laserShoot.play();
      }
    } else {
      options.lasers.push(new Laser(
        options.player.x + options.player.w - options.player.w / 4 - options.W10 / 2,
        options.player.y - options.W10));
      if (options.sounding) {
        options.sounds.laserShoot.play();
      }
    }
  }
}

export function up(e) {
  if (e) {
    e.preventDefault();
  }
  if (options.tilting) {
    if (e.keyCode && e.keyCode === 38) {
      options.keys.fire = false;
      addLaser(e.keyCode, false);
      return;
    }
  }
  if (e.keyCode && !options.tilting) {
    switch (e.keyCode) {
      case 37: options.keys.left = false; break;
      case 38: options.keys.fire = false; break;
      case 39: options.keys.right = false; break;
    }
    addLaser(e.keyCode, false);
    return;
  }
  if (options.tilting) {
    if (e.target.id === 'fire') {
      options.keys.fire = false;
      e.target.style.backgroundColor = '';
      addLaser(false, e.target.id);
    }
  }
  if (!options.tilting) {
    switch (e.target.id) {
      case 'left': options.keys.left = false; break;
      case 'fire': options.keys.fire = false; break;
      case 'right': options.keys.right = false; break;
    }
    e.target.style.backgroundColor = '';
    addLaser(false, e.target.id);
  }
}

export function dtr(a) {
  return a * Math.PI / 180;
}

export function rtd(a) {
  return a * 180 / Math.PI;
}

export function random(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}