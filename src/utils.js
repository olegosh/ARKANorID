import { options } from './options';
import { soundSrc } from './sounds';

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

export function dtr(a) {
  return a * Math.PI / 180;
}

export function rtd(a) {
  return a * 180 / Math.PI;
}

export function random(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}