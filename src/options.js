import { dtr } from './utils';
import { createColors } from './colors';
import { createMaps } from './maps';

export const options = {
  assignConsts() {
    this.colors = createColors();
    this.maps = createMaps();

    this.canvas = document.querySelector('#game');

    this.CW = Math.floor(window.innerWidth / 3) - 1;
    this.CH = Math.floor(window.innerHeight / 4);
    
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight - this.CH;

    this.cols = 13;
    this.font = 'Press Start 2P';

    this.context = canvas.getContext('2d');

    this.W = this.height > this.width ? Math.floor(this.width / 16) : Math.floor(this.height / 16);
    this.H = Math.floor(this.W / 2);
    this.W2 = this.H;
    this.W5 = Math.floor(this.W / 5);
    this.W10 = Math.floor(this.W / 10);
    this.H2 = Math.floor(this.H / 2);
    this.SW = this.W * this.cols;
    this.SH = this.height - this.W;

    this.keys = {};
    this.sounds = {};
    
    this.balls = [];
    this.bricks = [];
    this.capsules = [];
    this.lasers = [];
    this.portals = [];

    this.platformSpeed = 4;
    this.ballSpeed = this.platformSpeed;
    this.capsuleSpeed = 3;
    this.laserSpeed = this.capsuleSpeed;
    
    this.limit = 1E2;
    this.factor = 1E3;
    
    this.angleInc = 12;
    this.anglesSin = [];
    this.anglesCos = [];

    for (let a = 0, i = 0; a < 360; a += this.angleInc, i += 1) {
      this.anglesSin[i] = Math.sin(dtr(a));
      this.anglesCos[i] = Math.cos(dtr(a));
    }

    this.bgGradient = this.context.createLinearGradient(0, 0, 0, this.height);
    this.bgGradient.addColorStop(0, this.colors[1]);
    this.bgGradient.addColorStop(1, this.colors[0]);

    this.strip = document.querySelector('#strip');
    this.strip.style.width = this.width + 'px';
    this.strip.style.height = this.H + 'px';

    this.controls = document.querySelector('#controls');
    for (let i = 0; i < this.controls.children.length; i += 1) {
      this.controls.children[i].style.width = this.CW + 'px';
      this.controls.children[i].style.height = (this.CH - this.H) + 'px';
      this.controls.children[i].style.fontSize = this.W + 'px';
    }

    this.gameMenu = document.querySelector('#game-menu');
    this.tiltingInput = document.querySelector('#tilting-input');
    this.soundingInput = document.querySelector('#sounding-input');
    this.form = document.querySelector('#options-form');
    this.vols = this.form.elements.volume;
    this.playBtn = document.getElementById('play-btn');
    this.controlsBtn = document.getElementById('controls-btn');
    this.optionsBtn = document.getElementById('options-btn');
    this.aboutBtn = document.getElementById('about-btn');
    this.backBtns = document.getElementsByClassName('back-btn');
    this.gameMenu = document.getElementById('game-menu');
    this.gameStory = document.getElementById('game-story');
    this.gameControls = document.getElementById('game-controls');
    this.gameOptions = document.getElementById('game-options');
    this.gameAbout = document.getElementById('game-about');
    this.gameOver = document.getElementById('game-over');
    this.startBtn = document.getElementById('start-btn');
    this.opt = document.querySelector('#opt');
    this.optM = document.querySelector('#options-min-menu');
    this.close = document.querySelector('#close');
    this.tiltingMin = document.querySelector('#tilting-input-min');
    this.soundingMin = document.querySelector('#sounding-input-min');
    this.soundCheck = document.querySelector('#sound-check');
    this.loading = document.querySelector('#loading');
    this.restart = document.querySelector('#restart');
  },

  assignLets() {
    this.game;
    this.player;
    this.m;
    this.bg0;
    this.bg1;
    this.bg2;
    this.bg3;

    this.highPts = 0;
    this.points = 0;
    this.score = 0;
    this.highScore = 0;
    this.lives = 3;
    this.level = 1;
    this.tilting = false;
    this.sounding = false;
    this.auto = false;
    this.currentLvl = 0;
    this.currentBg = 0;
    this.volume = 0.5;
    this.inner = '';
  }
};