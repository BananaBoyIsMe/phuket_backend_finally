module.exports = (app) => {
  const attraction_controller = require("../controllers/attraction.controller");
  var router = require("express").Router();
  router.get("/", attraction_controller.getAllAttract);
  router.get("/:id", attraction_controller.getAttractDetail);
  router.get("/:limit/:offset", attraction_controller.getSomeAttract);
  router.post("/upload", attraction_controller.createNewAttract);

  router.put("/:id", attraction_controller.updateAttractCtrl);
  router.delete("/:id", attraction_controller.deleteAttract);

  app.use("/api/attract", router);
};