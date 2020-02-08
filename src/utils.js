export function dtr(a) {
  return a * Math.PI / 180;
}

export function rtd(a) {
  return a * 180 / Math.PI;
}

export function random(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}