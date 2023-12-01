module.exports = (app) => {
  const location_controller = require("../controllers/location.controller");
  var router = require("express").Router();
  router.get("/", location_controller.getAllLocation);
  router.get("/:id", location_controller.getLocationDetail);
  router.get("/:limit/:offset", location_controller.getSomeLocation);
  router.post("/upload", location_controller.createNewLocation);

  router.put("/:id", location_controller.updateLocationCtrl);
  router.delete("/:id", location_controller.deleteLocation);

  app.use("/api/location", router);
};