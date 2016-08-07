import * as moment from "moment"

class MarkGantt {
  ctx: CanvasRenderingContext2D
  w: number
  h: number

  constructor(el: HTMLElement) {
    var c = <HTMLCanvasElement>el;
    this.ctx = c.getContext("2d");
    this.w = c.offsetWidth;
    this.h = c.offsetHeight;
  }

  line(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(Math.round(x1) - 0.5, Math.round(y1));
    this.ctx.lineTo(Math.round(x2) - 0.5, Math.round(y2));
    this.ctx.stroke();
  }

  redraw() {
    var day = moment().daysInMonth()
    var size = this.w / day

    for (var i = 0; i < day; i++) {
      this.line(i * size, 0, i * size, this.h)
    }
  }
}

var markGantt = new MarkGantt(document.getElementById("mainCanvas"));
markGantt.redraw();

