import { options } from './options';

export function drawFR(x, y, w, h, c, ctx) {
  if(ctx) {
    ctx.save();
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  } else {
    context.save();
    context.fillStyle = c;
    context.fillRect(x, y, w, h);
    context.restore();
  }
}

export function drawSR(x, y, w, h, c, ctx) {
  if(ctx) {
    ctx.save();
    ctx.strokeStyle = c;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();
  } else {
    context.save();
    context.strokeStyle = c;
    context.strokeRect(x, y, w, h);
    context.restore();
  }
}

export function drawFC(x, y, r, c, ctx) {
  if(ctx) {
    ctx.save();
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  } else {
    context.save();
    context.fillStyle = c;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    context.restore();
  }
}

export function drawSC(x, y, r, c, ctx) {
  if(ctx) {
    ctx.save();
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  } else {
    context.save();
    context.strokeStyle = c;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.stroke();
    context.restore();
  }
}

export function drawFT(t, x, y, c, s) {
  context.save();
  context.fillStyle = c;
  context.font = s + 'px ' + options.font;
  context.fillText(t, x, y);
  context.restore();
}

export function drawST(t, x, y, c, s) {
  context.save();
  context.strokeStyle = c;
  context.font = s + 'px ' + options.font;
  context.strokeText(t, x, y);
  context.restore();
}