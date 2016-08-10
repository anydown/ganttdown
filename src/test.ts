/// <reference path="../node_modules/@types/mocha/index.d.ts" />
import {Task, parseTask} from "./lib"

import {assert} from "chai";

describe("parseTask", () => {
    it("タスク一つの場合のパース", (done) => {
        let tasks: Task[] = parseTask("task1 2016-01-01 2016-02-01")
        assert.equal(tasks.length, 1)
        assert.deepEqual(
          tasks[0], {
            name: "task1",
            start: new Date("2016-01-01").getTime(),
            end: new Date("2016-02-02").getTime() //終了日は実際には翌日の00:00になる
          }
        )
        done()
    });
});
