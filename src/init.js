import { options } from './options';
import { addEventListeners } from './listeners';

export function init() {
  options.assignLets();
  options.assignConsts();
  addEventListeners();

  // options.player = new Platform(
  //   options.SW / 2,
  //   options.SH - options.H
  // );

  // options.balls[0] = new Ball(
  //   options.player.x + options.player.w / 2,
  //   options.player.y - options.H / 2,
  //   true
  // );

  // for (let i = 0; i < options.maps.length; i += 1) {
  //   options.m = options.maps[i];
  //   options.bricks[i] = [];
  //   for (let y = 0; y < options.m.length; y += 1) {
  //     for (let x = 0; x < options.m[y].length; x += 1) {
  //       if (options.m[y][x] === '=') {
  //         continue;
  //       }
  //       options.bricks[i].push(
  //         new Brick(
  //           x * options.W + options.W,
  //           y * options.H + options.W,
  //           options.m[y][x])
  //       );
  //     }
  //   }
  // }

  // createSounds();
  // createBgImages();
  // setGame(levels);
  // startGame();

  options.loading.style.display = 'none';

}