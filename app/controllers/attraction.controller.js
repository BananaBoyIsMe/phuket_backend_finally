const Attract = require("../models/attraction.model");

const createNewAttract = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
  }
  const attractObject = {
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    detailed_description: req.body.detailed_description,
    things_to_do: req.body.things_to_do,
    url: req.body.url,
    locations_id: req.body.locations_id,
  };
  Attract.create(attractObject, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating"
      });
    } else {
      res.send(data);
    }
  });
};

const getAllAttract = (req, res) => {
  Attract.listing((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
};

const getAttractDetail = (req, res) => {
  Attract.listingDetail(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
}

const getSomeAttract = (req, res) => {
  Attract.listingSome(req.params.limit, req.params.offset, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
}

const updateAttractCtrl = (req, res) => {
  console.log("update");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  const data = {
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    detailed_description: req.body.detailed_description,
    things_to_do: req.body.things_to_do,
    url: req.body.url,
  };

  Attract.updateAttract(req.params.id, data, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(401).send({ message: "Not found attract: " + req.params.id });
      } else {
        res
          .status(500)
          .send({ message: "Error update attract: " + req.params.id });
      }
    }
    return res.status(200).send({
      message: `attraction updated successfully ${data.name} ${data.description} ${data.img} ${data.detailed_description} ${data.things_to_do} ${data.url}`,
    });
  });
};

const deleteAttract = (req, res)=>{
  // console.log("parameters: " + req.params.id + 
  // ", " + req.params.p1 + 
  // ", " + req.params.p2);
  Attract.removeAttract(req.params.id, (err, result)=>{
      if(err){
          if(err.kind == "not_found"){
              res.status(401).send(
                  {message: "Not found attract: " + req.params.id}
                  );
          }
          else{
              res.status(500).send(
                  {message: "Error delete attract: " + req.params.id}
                  );
          }
      }else{
          res.send(result);
      }
  });
};

module.exports = {
  createNewAttract,
  getAllAttract,
  getAttractDetail,
  getSomeAttract,
  updateAttractCtrl,
  deleteAttract,
};
