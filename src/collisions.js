export function rectColl(a, b) {
  let heights = a.h + b.h;
  if (b.y - a.y > heights) {
    return;
  }
  let side;
  let dx = (a.x + a.w / 2) - (b.x + b.w / 2);
  let dy = (a.y + a.h / 2) - (b.y + b.h / 2);
  let halfSWidth = (a.w + b.w) / 2;
  let halfSHeight = (a.h + b.h) / 2;
  let width = halfSWidth * dy;
  let height = halfSHeight * dx;
  if (Math.abs(dx) <= halfSWidth && Math.abs(dy) <= halfSHeight) {
    if (width > height) {
      side = width > -height ? 'bottom' : 'left';
    } else {
      side = width > -height ? 'right' : 'top';
    }
  }
  return side;
}

export function wallColl(x1, y1, x2, y2, wx1, wy1, wx2, wy2) {
  if (x1 <= wx1 || x2 >= wx2) {
    return 'x';
  }
  if (y1 <= wy1) {
    return 'y';
  }
  if (y2 >= wy2) {
    return 'z';
  }
}

export function sidesColl(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  return (ax1 <= bx2 && ax2 >= bx1 && ay1 <= by2 && ay2 >= by1);
}