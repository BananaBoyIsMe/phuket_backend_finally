module.exports = (app) => {
  const merchandise_controller = require("../controllers/merchandise.controller");
  var router = require("express").Router();
  router.get("/", merchandise_controller.getAllMerch);
  router.get("/:id", merchandise_controller.getMerchDetail);
  router.get("/:limit/:offset", merchandise_controller.getSomeMerch);
  router.post("/upload", merchandise_controller.createNewMerch);

  router.put("/:id", merchandise_controller.updateMerchCtrl);
  router.delete("/:id", merchandise_controller.deleteMerch);

  app.use("/api/merch", router);
};
