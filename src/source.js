import { options } from './options';
import { clear, drawBackground, switchLvlBg, drawBorder, drawInfo } from './draw';

export function levels() {
  clear();
  drawBackground();
  switchLvlBg();

  options.highPts = options.highPts > options.points ? options.highPts : options.points;
  for (let i = options.bricks[options.currentLvl].length - 1; i >= 0; i -= 1) {
    options.bricks[options.currentLvl][i].draw();
    options.bricks[options.currentLvl][i].checkL();
  }

  drawBorder();
  drawInfo();

  options.player.move();
  options.player.draw();

  for (let i = options.balls.length - 1; i >= 0; i -= 1) {
    if (options.balls[i]) {
      options.balls[i].move();
    }
    if (options.balls[i]) {
      options.balls[i].draw();
    }
  }
  let lastBall = options.balls[options.balls.length - 1];
  if (options.keys['fire'] && lastBall) {
    if (lastBall.sticky) {
      lastBall.y -= options.H;
      lastBall.dx = lastBall.dx ? lastBall.dx : 1;
      lastBall.dy = lastBall.dy ? -lastBall.dy : -1;
      lastBall.s = options.ballSpeed;
    }
    lastBall.sticky = false;
  }
  for (let i = options.balls.length - 1; i >= 0; i -= 1) {
    if (options.balls[i] && options.balls[i].deletable) {
      options.balls.splice(i, 1);
      if (options.sounding) {
        options.sounds.ballFlyaway.play();
      }
      if (options.balls.length === 0) {
        options.lives -= 1;
        changeState('normal');
      }
      if (options.lives > 0 && options.balls.length === 0) {
        options.balls.push(new Ball(
          options.player.x + options.player.w / 2,
          options.player.y - options.H / 2,
          true
        ));
        for (let i = options.portals.length - 1; i >= 0; i -= 1) {
          options.portals[i].deletable = true;
        }
      }
    }
  }
  let currentLvlBricks = options.bricks[options.currentLvl];
  for (let i = currentLvlBricks.length - 1; i >= 0; i -= 1) {
    if (currentLvlBricks[i].deletable) {
      let x = currentLvlBricks[i].x;
      let y = currentLvlBricks[i].y;
      options.points += currentLvlBricks.splice(i, 1)[0].p;
      if (options.sounding) {
        options.sounds.brickDestroyed.play();
      }
      if (calcProbability(options.limit)) {
        let rnd = random(0, 6);
        switch(rnd) {
          case 0: options.capsules.push(new Capsule(x, y, 'E')); break;
          case 1: options.capsules.push(new Capsule(x, y, 'D')); break;
          case 2: options.capsules.push(new Capsule(x, y, 'L')); break;
          case 3: options.capsules.push(new Capsule(x, y, 'S')); break;
          case 4: options.capsules.push(new Capsule(x, y, 'B')); break;
          case 5: options.capsules.push(new Capsule(x, y, 'C')); break;
          case 6: options.capsules.push(new Capsule(x, y, 'P')); break;
        }
      }
    }
  }
  let lastBall = options.balls[options.balls.length - 1];
  if (options.auto && options.player && lastBall) {
    options.player.x = lastBall.x - options.player.w / 2;
  }
  if (options.bricks[options.currentLvl].length === 0) {
    if (options.sounding) {
      options.sounds.newLvl.play();
    }
    changeState('normal');
    options.currentBg += 1;
    options.currentLvl += 1;
    options.level = options.currentLvl + 1;
    options.player.x = options.SW / 2;
    options.balls.length = 1;
    options.capsules.length = 0;
    options.lasers.length = 0;
    if (lastBall) {
      lastBall.x = options.player.x + options.player.w / 2;
      lastBall.y = options.player.y - options.H / 2;
      lastBall.sticky = true;
      lastBall.a = dtr(45);
    }
    for (let i = options.portals.length - 1; i >= 0; i -= 1) {
      options.portals[i].deletable = true;
    }
  }
  for (let i = options.capsules.length - 1; i >= 0; i -= 1) {
    if (options.capsules[i].d) {
      options.capsules.splice(i, 1);
    }
  }
  for (let i = options.capsules.length - 1; i >= 0; i -= 1) {
    options.capsules[i].move();
    options.capsules[i].draw();
    if (options.capsules[i].y >= options.height) {
      options.capsules[i].d = true;
    }
  }
  for (let i = options.lasers.length - 1; i >= 0; i -= 1) {
    if (options.lasers[i].d) {
      options.lasers.splice(i, 1);
    }
  }
  for (let i = options.lasers.length - 1; i >= 0; i -= 1) {
    options.lasers[i].move();
    options.lasers[i].draw();
    if (options.lasers[i].y <= options.W) {
      options.lasers[i].d = true;
    }
  }
  for (let i = options.portals.length - 1; i >= 0; i -= 1) {
    if (options.portals[i].deletable) {
      options.portals.splice(i, 1);
    }
  }
  for (let i = options.portals.length - 1; i >= 0; i -= 1) {
    options.portals[i].draw();
  }
  if (options.lives <= 0 || options.currentLvl === 33) {
    setGameover();
  }
  if (options.sounding && options.gameMenu.clientHeight) {
    options.sounds.menu.playLoop();
  } else if (options.sounding && !options.gameMenu.clientHeight) {
    options.sounds.menu.stop();
  }
}

function setGameover() {
  let receivedLives = options.lives;
  let receivedLvl = options.currentLvl;
  options.lives = 3;
  options.currentLvl = 0;
  options.score = options.points * options.factor;
  options.highScore = options.highScore > options.score ? options.highScore : options.score;
  options.inner = '';
  options.inner += '<span class="line-under"><br><br>GAME OVER</span><br><br>';
  options.inner += '<div class="line-under"><button class="btn" id="restart" onclick="reinit();">◄MENU</button></div>';
  if (receivedLvl === 33 && receivedLives > 0) {
    options.inner += '<span class="line-under"><br>CONGRATULATIONS !!!</span><br>';
    options.inner += '<span class="text-centered text-min">DIMENSION-CONTROLLING FORT "D||H",</span><br>';
    options.inner += '<span class="text-centered text-min">WHICH CAPTURED THE "SL LOGO", HAS</span><br>';
    options.inner += '<span class="text-centered text-min">NOW BEEN DEMOLISHED, "SL LOGO"</span><br>';
    options.inner += '<span class="text-centered text-min">RELEASED AND MANAGED TO ESCAPE</span><br>';
    options.inner += '<span class="text-centered text-min">FROM DISTORTED SPACE. KNOWLEDGE,</span><br>';
    options.inner += '<span class="text-centered text-min">RECEIVED WHILE MAKING "ARKAN||ID"</span><br>';
    options.inner += '<span class="text-centered text-min">GAME, WAS VERY USEFUL, BUT THE</span><br>';
    options.inner += '<span class="text-centered text-min">REAL CODE-VOYAGE OF "OLEG" HAS</span><br>';
    options.inner += '<span class="text-centered text-min">ONLY STARTED......I HOPE, YOU</span><br>';
    options.inner += '<span class="text-centered text-min">ENJOYED THIS JOURNEY SAME, AS ME.</span><br>';
    options.inner += '<span class="text-centered text-min">THANKS FOR PLAYING AND LEARNING.</span><br>';
  } else if (receivedLives <= 0) {
    options.inner += '<span class="text-centered">Reason: Not enough HP.</span><br>';
    options.inner += '<span class="text-centered">Solution: Please, try again.</span><br>';
  }
  options.inner += '<span class="line-under"><br>Your score:</span><br>';
  options.inner += '<span class="text-centered">' + options.score + '<br></span><br>';
  options.inner += '<span class="line-under">High score:</span><br>';
  options.inner += '<span class="text-centered">' + options.highScore + '<br></span><br>';
  options.gameOver.innerHTML = inner;
  options.gameOver.style.display = 'block';
}

export function startGame() {
  loop();
}

export function setGame(fun) {
  options.game = fun;
}

function loop() {
  options.game();
  requestAnimationFrame(loop);
}