import { options } from './options';

export function drawFR(x, y, w, h, c, ctx) {
  if (ctx) {
    ctx.save();
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  } else {
    options.context.save();
    options.context.fillStyle = c;
    options.context.fillRect(x, y, w, h);
    options.context.restore();
  }
}

export function drawSR(x, y, w, h, c, ctx) {
  if (ctx) {
    ctx.save();
    ctx.strokeStyle = c;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();
  } else {
    options.context.save();
    options.context.strokeStyle = c;
    options.context.strokeRect(x, y, w, h);
    options.context.restore();
  }
}

export function drawFC(x, y, r, c, ctx) {
  if (ctx) {
    ctx.save();
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else {
    options.context.save();
    options.context.fillStyle = c;
    options.context.beginPath();
    options.context.arc(x, y, r, 0, Math.PI * 2, false);
    options.context.closePath();
    options.context.fill();
    options.context.restore();
  }
}

export function drawSC(x, y, r, c, ctx) {
  if (ctx) {
    ctx.save();
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  } else {
    options.context.save();
    options.context.strokeStyle = c;
    options.context.beginPath();
    options.context.arc(x, y, r, 0, Math.PI * 2, false);
    options.context.closePath();
    options.context.stroke();
    options.context.restore();
  }
}

export function drawFT(t, x, y, c, s) {
  options.context.save();
  options.context.fillStyle = c;
  options.context.font = s + 'px ' + options.font;
  options.context.fillText(t, x, y);
  options.context.restore();
}

export function drawST(t, x, y, c, s) {
  options.context.save();
  options.context.strokeStyle = c;
  options.context.font = s + 'px ' + options.font;
  options.context.strokeText(t, x, y);
  options.context.restore();
}

export function clear() {
  options.context.clearRect(0, 0, options.width, options.height);
}

export function drawBackground() {
  drawFR(0, 0, options.width, options.height, options.bgGradient);
}

export function drawBorder() {
  for (let x = 0; x < options.W * (options.cols + 1); x += options.W) {
    drawFR(options.H + x, options.H, options.W, options.H, options.colors[2]);
  }
  for (let y = 0; y < options.height; y += options.W) {
    if (y <= options.W * 4) {
      drawFR(options.H, options.H + y, options.H, options.W, options.colors[2]);
    }
    if (y >= options.W * 4 && y < options.W * 8) {
      drawFR(options.H, options.H + y, options.H, options.W, options.colors[3]);
    }
    if (y >= options.W * 8 && y < options.W * (options.cols + 1)) {
      drawFR(options.H, options.H + y, options.H, options.W, options.colors[4]);
    }
    if (y >= options.W * (options.cols + 1)) {
      drawFR(options.H, options.H + y, options.H, options.W, options.colors[5]);
    }
  }
  for (let y = 0; y < options.height; y += options.W) {
    if (y <= options.W * 4) {
      drawFR(options.W * (options.cols + 1), options.H + y, options.H, options.W, options.colors[2]);
    }
    if (y >= W * 4 && y < W * 8) {
      drawFR(options.W * (options.cols + 1), options.H + y, options.H, options.W, options.colors[3]);
    }
    if (y >= options.W * 8 && y < options.W * (options.cols + 1)) {
      drawFR(options.W * (options.cols + 1), options.H + y, options.H, options.W, options.colors[4]);
    }
    if (y >= options.W * (options.cols + 1)) {
      drawFR(options.W * (options.cols + 1), options.H + y, options.H, options.W, options.colors[5]);
    }
  }
}

export function drawInfo() {
  drawFT(
    'HI',
    options.W * (options.cols + 1) + options.H + options.H / 2,
    options.W * 2 + options.H,
    options.colors[2],
    options.H
  );
  drawFT(
    'PTS:',
    options.W * (options.cols + 1) + options.H + options.H / 2,
    options.W * 2 + options.H * 2,
    options.colors[2],
    options.H
  );
  drawFT(
    options.options.highPts,
    options.W * (options.cols + 1) + options.H + options.H / 2,
    options.W * 2 + options.H * 3 + options.H,
    options.colors[2],
    options.H
  );
  drawFT(
    'PTS:',
    options.W * (cols + 1) + options.H + options.H / 2,
    options.W * 2 + options.H * 4 + options.H * 2,
    options.colors[3],
    options.H
  );
  drawFT(
    options.points,
    options.W * (options.cols + 1) + options.H + options.H / 2,
    options.W * 2 + options.H * 5 + options.H * 3,
    options.colors[3],
    options.H
  );
  drawFT(
    'HP:',
    options.W * (cols + 1) + options.H + options.H / 2,
    options.W * 2 + options.H * 6 + options.H * 4,
    options.colors[4],
    options.H
  );
  drawFT(
    options.lives,
    options.W * (options.cols + 1) + options.H + options.H / 2,
    options.W * 2 + options.H * 7 + options.H * 5,
    options.colors[4],
    options.H
  );
  drawFT(
    'LVL:',
    options.W * (cols + 1) + H + options.H / 2,
    options.W * 2 + options.H * 8 + options.H * 6,
    options.colors[5],
    options.H
  );
  drawFT(
    options.level,
    options.W * (options.cols + 1) + options.H + options.H / 2,
    options.W * 2 + options.H * 9 + options.H * 7,
    options.colors[5],
    options.H
  );
}

const width = options.width;
const height = options.height;
const SW = options.SW;
const SH = options.SH;
const colors = options.colors;
const W = options.W;
const H = options.H;

export function createBgImages() {
  let canvas = document.createElement('canvas');
  canvas.width = SW;
  canvas.height = SH;
  let context = canvas.getContext('2d');
  drawFR(0, 0, width, height, colors[24], context);
  for (let y = 0; y <= height; y += W) {
    for (let x = 0; x <= width; x += W) {
      if (x % 2 === 0) {
        drawFR(x, y, W, H, colors[24], context);
        drawFR(x, y + H, W, H, colors[25], context);
        drawFR(x + H / 2, y + H / 2, W, H, colors[25], context);
        drawFR(x + H / 2, y + H + H / 2, W, H, colors[24], context);
      } else {
        drawFR(x, y, W, H, colors[25], context);
        drawFR(x, y + H, W, H, colors[24], context);
        drawFR(x + H / 2, y + H / 2, W, H, colors[24], context);
        drawFR(x + H / 2, y + H + H / 2, W, H, colors[25], context);
      }
    }
  }
  drawFR(0, 0, width, height, colors[34], context);
  options.bg0 = document.createElement('img');
  options.bg0.width = width;
  options.bg0.height = height;
  options.bg0.src = canvas.toDataURL('image/jpeg', 1.0);
  context.clearRect(0, 0, width, height);
  for (let y = 0; y <= height; y += W * 2) {
    for (let x = 0; x <= width; x += W) {
      drawFR(x, y, W, W * 2, colors[26], context);
      drawFR(x + W / 2 - H / 4, y + W - H + H / 2, H / 2, H / 4, colors[27], context);
      drawFC(x + W / 2, y + W / 2, H / 2, colors[27], context);
      drawFC(x + W / 2, y, H, colors[27], context);
      drawFC(x + W / 2 - W / 5, y + H / 3, H / 4, colors[26], context);
      drawFC(x + W / 2 + W / 5, y + H / 3, H / 4, colors[26], context);
    }
  }
  drawFR(0, 0, width, height, colors[34], context);
  options.bg1 = document.createElement('img');
  options.bg1.width = width;
  options.bg1.height = height;
  options.bg1.src = canvas.toDataURL('image/jpeg', 1.0);
  context.clearRect(0, 0, width, height);
  for (let y = 0; y <= height; y += W * 2) {
    for (let x = 0; x <= width; x += W) {
      drawFR(x, y, W, W * 2, colors[28], context);
      drawFR(x + W / 5, y + W / 5, W, W, colors[29], context);
      drawFR(x + W / 4, y + W / 4, W, W, colors[28], context);
      drawFC(x + W / 2, y + H / 2 - W / 5, H / 2, colors[29], context);
      drawSC(x + W / 2, y + H / 2 + W / 5, H / 4, colors[29], context);
      drawFR(x + W - W / 5, y + H / 2, W / 2, W / 2, colors[29], context);
      drawFR(x + W - W / 2, y + H / 2 + H / 3, W / 2, W / 2, colors[28], context);
      drawFR(x + H / 3, y + H / 2 + H / 3 - W / 5 + H, W / 2, W / 2, colors[29], context);
      drawFR(x + H / 3 - H / 5, y + H / 2 + H / 3 - W / 5 - H / 5 + H, W / 2, W / 2, colors[28], context);
    }
  }
  drawFR(0, 0, width, height, colors[34], context);
  options.bg2 = document.createElement('img');
  options.bg2.width = width;
  options.bg2.height = height;
  options.bg2.src = canvas.toDataURL('image/jpeg', 1.0);
  context.clearRect(0, 0, width, height);
  for (let y = 0; y <= height; y += W * 2) {
    for (let x = 0; x <= width; x += W) {
      drawFR(x, y, W, W * 2, colors[30], context);
      drawFR(x + W / 2, y + W, H / 2, H, colors[31], context);
      drawFR(x + W / 4, y + W, H / 3, H / 3, colors[31], context);
      drawSR(x + W / 2, y + W / 2, H / 2, H, colors[31], context);
      drawSR(x + W / 3, y + W + H / 3, H, H * 2, colors[31], context);
      drawFR(x + W / 4, y + W, H / 2, H * 2 - H / 3, colors[31], context);
      drawFR(x, y + W + W / 2, H / 2, H, colors[31], context);
      drawFR(x + W / 4, y, H / 3, H / 3, colors[31], context);
    }
  }
  drawFR(0, 0, width, height, colors[34], context);
  options.bg3 = document.createElement('img');
  options.bg3.width = width;
  options.bg3.height = height;
  options.bg3.src = canvas.toDataURL('image/jpeg', 1.0);
  context.clearRect(0, 0, width, height);
}

function drawLvlBg(idx) {
  if (idx === 0) {
    options.context.drawImage(options.bg0, W, W, SW, SH);
  } else if (idx === 1) {
    options.context.drawImage(options.bg1, W, W, SW, SH);
  } else if (idx === 2) {
    options.context.drawImage(options.bg2, W, W, SW, SH);
  } else {
    options.context.drawImage(options.bg3, W, W, SW, SH);
  }
}

export function switchLvlBg() {
  if (options.currentBg >= 4) options.currentBg = 0;
  switch(options.currentBg) {
    case 0: drawLvlBg(0); break;
    case 1: drawLvlBg(1); break;
    case 2: drawLvlBg(2); break;
    case 3: drawLvlBg(3); break;
  }
}