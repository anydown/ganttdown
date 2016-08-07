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
    var month:number = moment().month();
    var day = moment().daysInMonth()
    var size = this.w / day
    var paddingTop = 48

    this.ctx.save();
    this.ctx.font = "24px 'sans-serif'";
    this.ctx.fillText("" + (month + 1) + "月", 4, 24);
    this.ctx.restore();

    this.ctx.save()
    for (var i = 0; i < day; i++) {
      var t = moment().date(i + 1).weekday()
      var color = "#FFFFFF";
      if(t === 0){
        color = "#FFDDDD"
      }
      if(t === 6){
        color = "#DDDDFF"
      }
      this.ctx.fillStyle = color
      this.ctx.fillRect(i * size, paddingTop, size, this.h - paddingTop)
    }
    this.ctx.restore();

    for (var i = 0; i < day; i++) {
      this.ctx.save()
      this.ctx.font = "12px 'sans-serif'"
      this.ctx.textAlign = "center"
      this.ctx.fillText(""+ (i+1), i * size + size / 2, paddingTop)
      this.line(i * size, paddingTop, i * size, this.h)
      this.ctx.restore()
    }
  }
}

var markGantt = new MarkGantt(document.getElementById("mainCanvas"));
markGantt.redraw();

