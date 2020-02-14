const db = require("../models");
const Util = require("../libs/util");
const baseLog = require("../log");

class Base {
  constructor() {
    this.util = Util;
  }
  async getTransaction(ctx, tsName = "") {
    const requestId = ctx.requestId || (ctx.header && ctx.header["x-request-id"]) || "";
    const dbLogger = baseLog.getReqIdLogger(requestId, "db");
    const dbLogging = Util.buildDbLogging(dbLogger.db);

    const transaction = await db.sequelize.transaction({
      bizName: tsName,
      logging: dbLogging
    });
    return transaction;
  }
}

module.exports = Base;
