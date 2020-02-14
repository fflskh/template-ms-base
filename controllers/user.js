/* eslint-disable require-atomic-updates */
const Base = require("./base");
const { RES_CODE } = require("../constants");
const { UserService } = require("../services");

class UserController extends Base {
  async addUser(ctx) {
    let transaction = await this.getTransaction(ctx, "biz");
    try {
      let userService = new UserService(ctx);
      let msg = await userService.addUser();

      ctx.log.biz.info({
        message: "add user api",
        data: {
          msg: msg
        }
      });

      ctx.body = {
        ...RES_CODE.SUCCESS,
        data: {
          msg: msg
        }
      };
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  }
}
module.exports = UserController;
