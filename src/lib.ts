import * as moment from "moment"

export function parseTask(textData: string): any {
  var tasks = textData.split(/\r|\n|\r\n/).map(function (line) {
    line = line.replace(/／/g, "/");
    line = line.replace(/　/g, " ");
    line = line.replace(/〜/g, " ");
    var args = line.split(" ");

    var inputPattern = [
      "MM/DD",
      "MM月DD日",
      "YYYY年MM月DD日",
      "YYYY/MM/DD",
      "YYYY-MM-DD"
    ];

    var startTime = moment.utc(args[1], inputPattern);
    var endTime = moment.utc(args[2], inputPattern);

    if (args.length > 2) {
      return {
        name: args[0],
        start: startTime.unix() * 1000,
        end: endTime.unix() * 1000 + 1000 * 60 * 60 * 24
      };
    }
    return null;
  }).filter(function (item) { return item });

  return tasks;
}
