import { dtr } from "./utils";
import { createColors } from "./colors";
import { createMaps } from "./maps";

export const options = {
  assignConsts() {
    this.canvas = document.querySelector('#game');
    this.CW = Math.floor(window.innerWidth / 3) - 1;
    this.CH = Math.floor(window.innerHeight / 4);
    this.cols = 13;
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight - CH;
    this.context = canvas.getContext('2d');
    this.W = this.height > this.width ? Math.floor(this.width / 16) : Math.floor(this.height / 16);
    this.H = Math.floor(W / 2);
    this.W2 = H;
    this.W5 = Math.floor(W / 5);
    this.W10 = Math.floor(W / 10);
    this.H2 = Math.floor(H / 2);
    this.SW = W * cols;
    this.SH = height - W;

    this.colors = createColors();

    this.bgGradient = this.context.createLinearGradient(0, 0, 0, this.height);
    this.bgGradient.addColorStop(0, this.colors[1]);
    this.bgGradient.addColorStop(1, this.colors[0]);

    this.maps = createMaps();

    this.keys = {};

    this.strip = document.querySelector('#strip');
    this.strip.style.width = this.width + 'px';
    this.strip.style.height = this.H + 'px';

    this.controls = document.querySelector('#controls');
    for (let i = 0; i < this.controls.children.length; i += 1) {
      this.controls.children[i].style.width = this.CW + 'px';
      this.controls.children[i].style.height = (this.CH - this.H) + 'px';
      this.controls.children[i].style.fontSize = this.W + 'px';
    }

    this.platformSpeed = 4;
    this.balls = [];
    this.ballSpeed = platformSpeed;
    this.capsuleSpeed = 3;
    this.laserSpeed = capsuleSpeed;
    this.bricks = [];

    this.gameMenu = document.querySelector('#game-menu');
    this.tiltingInput = document.querySelector('#tilting-input');
    this.soundingInput = document.querySelector('#sounding-input');

    this.factor = 1E3;
    
    this.sounds = {};
    this.form = document.querySelector('#options-form');
    this.vols = form.elements.volume;

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

    this.limit = 1E2;

    this.capsules = [];
    this.lasers = [];
    this.portals = [];

    this.opt = document.querySelector('#opt');
    this.optM = document.querySelector('#options-min-menu');
    this.close = document.querySelector('#close');
    this.tiltingMin = document.querySelector('#tilting-input-min');
    this.soundingMin = document.querySelector('#sounding-input-min');
    this.soundCheck = document.querySelector('#sound-check');
    this.loading = document.querySelector('#loading');
    this.restart = document.querySelector('#restart');
    this.angleInc = 12;
    this.anglesSin = [];
    this.anglesCos = [];

    for (let a = 0, i = 0; a < 360; a += angleInc, i += 1) {
      this.anglesSin[i] = Math.sin(dtr(a));
      this.anglesCos[i] = Math.cos(dtr(a));
    }
  },

  assignLets() {
    this.game;
    this.highPts = 0;
    this.points = 0;
    this.score = 0;
    this.highScore = 0;
    this.lives = 3;
    this.level = 1;
    this.player;
    this.m;
    this.tilting;
    this.sounding;
    this.bg0;
    this.bg1;
    this.bg2;
    this.bg3;
    this.auto;
    this.currentLvl;
    this.currentBg;
    this.volume;
    this.inner;
  }
};