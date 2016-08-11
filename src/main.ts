import * as moment from "moment"
import {Task, parseTask} from "./lib"

class GanttDown {
  ctx: CanvasRenderingContext2D
  w: number
  h: number
  tasks: Task[]

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

  private drawMonthLabel(ctx: CanvasRenderingContext2D, start: moment.Moment, dayNum: number, size: number){
    var month = start.month();
    ctx.save();
    ctx.font = "24px 'sans-serif'";
    ctx.fillText("" + (month+1) + "月", 0, 24);
    var _start = start.clone()
    for (var i = 0; i < dayNum; i++) {
      if(_start.month() > month){
        month = _start.month();
        ctx.fillText("" + (month+1) + "月", i * size, 24);
      }
      _start.add(1, "days")
    }
    ctx.restore();
  }

  private drawWeekdayBackground(ctx: CanvasRenderingContext2D, start: moment.Moment, dayNum: number, size: number, paddingTop: number){
    var _start = start.clone()
    ctx.save()
    for (var i = 0; i < dayNum; i++) {
      var t = _start.weekday()
      var color = "#FFFFFF";
      if(t === 0){
        color = "#FFDDDD"
      }
      if(t === 6){
        color = "#DDDDFF"
      }
      ctx.fillStyle = color
      ctx.fillRect(i * size, paddingTop, size, this.h - paddingTop)
      _start.add(1, "days")
    }
    ctx.restore();
  }

  private drawVerticalLines(ctx: CanvasRenderingContext2D, start: moment.Moment, dayNum: number, size: number, paddingTop: number){
    this.ctx.save()
    ctx.strokeStyle = "#AAA"
    const labelBottomMargin = 4;

    var _start = start.clone()
    for (var i = 0; i < dayNum; i++) {
      ctx.font = "12px 'sans-serif'"
      ctx.textAlign = "center"

      //土日の文字色
      var t = _start.weekday()
      var color = "#000000";
      if(t === 0){
        color = "#FF3333"
      }
      if(t === 6){
        color = "#3333FF"
      }      
      ctx.fillStyle = color
      ctx.fillText(""+ _start.date(), i * size + size / 2, paddingTop - labelBottomMargin)
      this.line(i * size, paddingTop, i * size, this.h)
      _start.add(1, "days")
    }
    this.ctx.restore()
  }
  private drawTasks(ctx: CanvasRenderingContext2D, start: moment.Moment, dayNum: number, size: number, paddingTop: number, tasks: Task[]){
    const taskMargin: number = 18;
    const taskHeight: number = 12;
    const paddingRight: number = 6;

    ctx.save()
    var _start = start.clone()
    for (var i = 0; i < tasks.length; i++) {
      var taskStart = moment(tasks[i].start);
      var taskEnd = moment(tasks[i].end);
      var startX = taskStart.diff(_start, "days") * size
      var endX = taskEnd.diff(_start, "days") * size

      ctx.fillStyle = "#66C"
      ctx.fillRect( startX, paddingTop + i * (taskHeight + taskMargin) + taskMargin, endX - startX, taskHeight)

      ctx.strokeStyle = "#000"
      ctx.strokeRect( startX, paddingTop + i * (taskHeight + taskMargin) + taskMargin, endX - startX, taskHeight)

      ctx.textBaseline = "middle"
      ctx.font = "bold 12px 'sans-serif'"
      ctx.textAlign = "end"

      ctx.fillStyle = "#000"
      ctx.fillText(""+ tasks[i].name, startX - paddingRight, paddingTop + i * (taskHeight + taskMargin) + taskMargin + taskHeight / 2)

    }
    ctx.restore()
  }

  redraw() {
    var days = 36;

    var start = moment();
    start.set({hour:0,minute:0,second:0,millisecond:0});

    var end = moment().add(days, "days");
    end.set({hour:0,minute:0,second:0,millisecond:0});

    var month:number = moment().month();
    var size = this.w / days
    var paddingTop = 48

    this.drawMonthLabel(this.ctx, start, days, size)
    this.drawWeekdayBackground(this.ctx, start, days, size, paddingTop)
    this.drawVerticalLines(this.ctx, start, days, size, paddingTop)
    this.drawTasks(this.ctx, start, days, size, paddingTop, parseTask("task1 2016-08-16 2016-08-16\rtask2 2016-08-17 2016-08-18\rtask3 2016-08-18 2016-08-24"));
  }
}

var ganttDown = new GanttDown(document.getElementById("mainCanvas"));
ganttDown.redraw();

