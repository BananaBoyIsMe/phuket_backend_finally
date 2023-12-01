module.exports = (app) => {
  const dashboard_controller = require("../controllers/dashboard.controller");
  var router = require("express").Router();
  router.get("/", dashboard_controller.getDash1);
  router.get("/:choose/:id", dashboard_controller.getDash2);
  app.use("/api/dash", router);
};
