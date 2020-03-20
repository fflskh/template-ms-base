/*
 * 运行定时任务
 */
const config = require("config");
const timer = require("./timer");
const Util = require("../libs/util");
const testTask = require("./test-task");
const log = require("../log");

const testRule = config.get("timerRules.test");
if (testRule.enable) {
  let redisLockKey = `test-${process.env.NODE_ENV||"development"}`;
  timer.run(Util.getScheduleRule(testRule.rules), Util.doTask(testTask.task, redisLockKey, log));
}
