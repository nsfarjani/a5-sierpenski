export default class Sierpinski {
  constructor(canvas) {
    this.canvas = canvas;
    this.length = Math.min(this.canvas.width, this.canvas.height);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
    this.ctx.fillStyle = 'black';
  }

  drawTriangle(a, b, c) {
    this.ctx.beginPath();
    this.ctx.moveTo(a.x, a.y);
    this.ctx.lineTo(b.x, b.y);
    this.ctx.lineTo(c.x, c.y);
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawSierpinski(a, b, c, iterations) {
    if (iterations === 0) {
      this.drawTriangle(a, b, c);
    } else {
      const ab = {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2};
      const bc = {x: (b.x + c.x) / 2, y: (b.y + c.y) / 2};
      const ca = {x: (c.x + a.x) / 2, y: (c.y + a.y) / 2};
      this.drawSierpinski(a, ab, ca, iterations - 1);
      this.drawSierpinski(ab, b, bc, iterations - 1);
      this.drawSierpinski(ca, bc, c, iterations - 1);
    }
  }

  render(iterations) {
    this.ctx.clearRect(-1 * (this.canvas.width / 2), -1 * (this.canvas.height / 2), this.canvas.width, this.canvas.height);
    const l = this.length;
    const height = (Math.sqrt(3) / 2) * l;
    const startPoint = {x: -l / 2, y: height / 2};
    const endPoint = {x: l / 2, y: height / 2};
    const midPoint = {x: 0, y: -height / 2};
    this.drawSierpinski(startPoint, endPoint, midPoint, iterations);
  }
}
