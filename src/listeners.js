import { options } from './options';

options.controls.addEventListener('mousedown', down, false);
options.controls.addEventListener('mouseup', up, false);
options.controls.addEventListener('touchstart', down, false);
options.controls.addEventListener('touchend', up, false);

window.addEventListener('keydown', down, false);
window.addEventListener('keyup', up, false);

options.tiltingInput.addEventListener('change', function() {
  playBtnSnd();
  options.tilting = !options.tilting;
  options.tiltingMin.checked = !options.tiltingMin.checked;
}, false);

options.soundingInput.addEventListener('change', function() {
  playBtnSnd();
  options.sounding = !options.sounding;
  options.soundingMin.checked = !options.soundingMin.checked;
}, false);

for (let i = 0; i < vols.length; i += 1) {
  options.vols[i].addEventListener('change', setVol, false);
}

options.playBtn.addEventListener('click', function() {
  showAndHide(gameStory, gameMenu);
  playBtnSnd();
}, false);

options.controlsBtn.addEventListener('click', function() {
  showAndHide(gameControls, gameMenu);
  playBtnSnd();
}, false);

options.optionsBtn.addEventListener('click', function() {
  showAndHide(gameOptions, gameMenu);
  playBtnSnd();
}, false);

options.aboutBtn.addEventListener('click', function() {
  showAndHide(gameAbout, gameMenu);
  playBtnSnd();
}, false);

for (let i = 0; i < options.backBtns.length; i += 1) {
  options.backBtns[i].addEventListener('click', function() {
    showAndHide(gameMenu, [gameControls, gameOptions, gameAbout, gameOver]);
    playBtnSnd();
  }, false);
}

options.startBtn.addEventListener('click', function() {
  showAndHide(null, gameStory);
  playBtnSnd();
}, false);




