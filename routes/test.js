const router = require("koa-router")();
const controllers = require("../controllers");

router.prefix("/api/user");

router.post("/add", controllers.user.addUser.bind(controllers.user));

module.exports = router;
