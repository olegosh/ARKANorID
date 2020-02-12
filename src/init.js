import { options } from './options';
import { addEventListeners } from './listeners';
import { createSounds, playBtnSnd, showAndHide } from './utils';
import { createBgImages } from './draw';
import { setGame, levels, startGame } from './source';
import { Platform } from './Platform';
import { Ball } from './Ball';
import { Brick } from './Brick';

function createObjects() {
  options.player = new Platform(
    options.SW / 2,
    options.SH - options.H
  );

  options.balls[0] = new Ball(
    options.player.x + options.player.w / 2,
    options.player.y - options.H / 2,
    true
  );

  for (let i = 0; i < options.maps.length; i += 1) {
    options.m = options.maps[i];
    options.bricks[i] = [];
    for (let y = 0; y < options.m.length; y += 1) {
      for (let x = 0; x < options.m[y].length; x += 1) {
        if (options.m[y][x] === '=') {
          continue;
        }
        options.bricks[i].push(
          new Brick(
            x * options.W + options.W,
            y * options.H + options.W,
            options.m[y][x])
        );
      }
    }
  }
}

export function init() {
  options.assignLets();
  options.assignConsts();
  addEventListeners();

  createObjects();

  createSounds();
  createBgImages();
  setGame(levels);
  startGame();

  options.loading.style.display = 'none';
}

export function reinit() {
  playBtnSnd();
  showAndHide(options.gameMenu, options.gameOver);

  options.points = 0;
  options.score = 0;
  options.lives = 3;
  options.currentLvl = 0;
  options.level = options.currentLvl + 1;
  options.bricks.length = 0;
  options.currentBg = 0;

  createObjects();
}

window.__reinit = reinit;