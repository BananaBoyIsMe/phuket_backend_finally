module.exports = (app) => {
  const rating_controller = require("../controllers/rating.controller");
  var router = require("express").Router();
  router.get("/", rating_controller.getAllRating);
  router.get("/:id", rating_controller.getRatingDetail);
  router.get("/:merch_id/:att_id", rating_controller.getSomeRating);
  router.post("/upload", rating_controller.createNewRating);

  router.put("/:id", rating_controller.updateRatingCtrl);
  router.delete("/:id", rating_controller.deleteRating);
  app.use("/api/rating", router);
};