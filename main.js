const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;


function drawPoint(x, y, res, color){
  context.fillStyle = "rgb(" + color * 2.55 + "," + color * 2.55 + "," + color * 2.55 + ")";
  context.fillRect(x, y, res, res);
}


function draw(wx, wy, zoom, res) {
  if(res <= 0) res = 1;

  for (let x = 0; x < canvas.width / res; x++) {
    for (let y = 0; y < canvas.height / res; y++) {
      let a = (x + (wx / res / zoom) - (canvas.width / 2) / res) / (canvas.width / zoom / res / 1.777);
      let b = (y + (wy / res / zoom) - (canvas.height / 2) / res) / (canvas.height / zoom / res);

      let c = new ComplexNumber(a, b);
      let z = new ComplexNumber(0, 0);

      let iter = 0;

      while(iter < 100) {
        iter += 1;
        z.sqr();
        z.add(c);

        if(z.magn() > 2) break;
      }

      drawPoint(x * res, y * res, res, iter);
    }
  }
}


class ComplexNumber {
  constructor(a, b) { this.a = a; this.b = b; }

  sqr() {
    let tmp = (this.a * this.a) - (this.b * this.b);
    this.b = 2 * this.a * this.b; this.a = tmp;
  }

  magn() { return Math.sqrt((this.a * this.a) + (this.b * this.b)); }

  add(c) { this.a += c.a; this.b += c.b; }
}


function repaint() {
  let wx = document.getElementById('wx').value;
  let wy = document.getElementById('wy').value;
  let zoom = 1 / document.getElementById('zoom').value;
  let res = document.getElementById('res').value;
  draw(wx, wy, zoom, res);
}


draw(0, 0, 2, 3);