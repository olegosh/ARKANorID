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

export function dtr(a) {
  return a * Math.PI / 180;
}

export function rtd(a) {
  return a * 180 / Math.PI;
}

export function random(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}