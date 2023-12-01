const Rating = require("../models/rating.model");

const createNewRating = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
  }
  const ratingObject = {
    rating: req.body.rating,
    comment: req.body.comment,
    time: req.body.img,
    users_id: req.body.users_id,
    att_id: req.body.att_id,
    merch_id: req.body.merch_id,
  };
  Rating.create(ratingObject, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating"
      });
    } else {
      res.send(data);
    }
  });
};

const getAllRating = (req, res) => {
  Rating.listing((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
};

const getRatingDetail = (req, res) => {
  Rating.listingDetail(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
}

const getSomeRating = (req, res) => {
  Rating.listingSome(req.params.merch_id, req.params.att_id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
}

const updateRatingCtrl = (req, res) => {
  console.log("update");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  const data = {
    rating: req.body.rating,
    comment: req.body.comment,
  };

  Rating.updateRating(req.params.id, data, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(401).send({ message: "Not found rating: " + req.params.id });
      } else {
        res
          .status(500)
          .send({ message: "Error update rating: " + req.params.id });
      }
    }
    return res.status(200).send({
      message: `rating updated successfully ${data.rating} ${data.comment}`,
    });
  });
};

const deleteRating = (req, res)=>{
  // console.log("parameters: " + req.params.id + 
  // ", " + req.params.p1 + 
  // ", " + req.params.p2);
  Rating.removeRating(req.params.id, (err, result)=>{
      if(err){
          if(err.kind == "not_found"){
              res.status(401).send(
                  {message: "Not found rating: " + req.params.id}
                  );
          }
          else{
              res.status(500).send(
                  {message: "Error delete rating: " + req.params.id}
                  );
          }
      }else{
          res.send(result);
      }
  });
};

module.exports = {
  createNewRating,
  getAllRating,
  getRatingDetail,
  getSomeRating,
  updateRatingCtrl,
  deleteRating,
};
