import { options } from './options';
import { reinit } from './init';
import { checkSounds, down, up, playBtnSnd, setVol, showAndHide } from './utils';

export function addEventListeners() {
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

  for (let i = 0; i < options.vols.length; i += 1) {
    options.vols[i].addEventListener('change', setVol, false);
  }

  options.playBtn.addEventListener('click', function() {
    showAndHide(options.gameStory, options.gameMenu);
    playBtnSnd();
  }, false);

  options.controlsBtn.addEventListener('click', function() {
    showAndHide(options.gameControls, options.gameMenu);
    playBtnSnd();
  }, false);

  options.optionsBtn.addEventListener('click', function() {
    showAndHide(options.gameOptions, options.gameMenu);
    playBtnSnd();
  }, false);

  options.aboutBtn.addEventListener('click', function() {
    showAndHide(options.gameAbout, options.gameMenu);
    playBtnSnd();
  }, false);

  for (let i = 0; i < options.backBtns.length; i += 1) {
    options.backBtns[i].addEventListener('click', function() {
      showAndHide(options.gameMenu, [options.gameControls, options.gameOptions, options.gameAbout, options.gameOver]);
      playBtnSnd();
    }, false);
  }

  options.startBtn.addEventListener('click', function() {
    showAndHide(null, options.gameStory);
    playBtnSnd();
  }, false);

  window.addEventListener('devicemotion', function(e) {
    if (!e.accelerationIncludingGravity || !options.tilting) return;
    let accel = e.accelerationIncludingGravity;
    let xa = accel.x;
    if (xa > 1) {
      options.keys['left'] = true;
    } else if (xa < -1) {
      options.keys['right'] = true;
    } else {
      options.keys['left'] = false;
      options.keys['right'] = false;
    }
  }, false);

  options.opt.addEventListener('click', function() {
    playBtnSnd();
    if(options.optM.clientHeight) {
      options.optM.style.display = 'none';
      options.close.style.display = 'none';
    } else {
      options.optM.style.display = 'block';
      options.close.style.display = 'inline';
    }
  }, false);

  options.tiltingMin.addEventListener('change', function() {
    playBtnSnd();
    options.tilting = !options.tilting;
    options.tiltingInput.checked = !options.tiltingInput.checked;
  }, false);

  options.soundingMin.addEventListener('change', function() {
    playBtnSnd();
    options.sounding = !options.sounding;
    options.soundingInput.checked = !options.soundingInput.checked;
    if(!options.sounding) {
      checkSounds();
    }
    // checkSounds();
  }, false);

  options.soundCheck.addEventListener('click', function() {
    if(options.sounding) {
      options.sounds.menuBtn.play();
    }
  }, false);

  options.soundCheck.addEventListener('click', checkSounds, false);

  options.restart.addEventListener('click', reinit, false);

  window.addEventListener('dblclick', function(e) { e.preventDefault(); }, false);
  window.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);
  window.addEventListener('selectstart', function(e) { e.preventDefault(); }, false);
  window.addEventListener('dragstart', function(e) { e.preventDefault(); }, false);
}