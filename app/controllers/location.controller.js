const Location = require("../models/location.model");

const createNewLocation = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
  }
  const locationObject = {
    id: req.body.id,
    address: req.body.address,
    road: req.body.road,
    subdistrict: req.body.subdistrict,
    district: req.body.district,
    province: req.body.province,
    postal_code: req.body.postal_code,
  };
  Location.create(locationObject, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating"
      });
    } else {
      res.send(data);
    }
  });
};

const getAllLocation = (req, res) => {
  Location.listing((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
};

const getLocationDetail = (req, res) => {
  Location.listingDetail(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
}

const getSomeLocation = (req, res) => {
  Location.listingSome(req.params.limit, req.params.offset, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
}

const updateLocationCtrl = (req, res) => {
  console.log("update");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  const data = {
    address: req.body.address,
    road: req.body.road,
    subdistrict: req.body.subdistrict,
    district: req.body.district,
    province: req.body.province,
    postal_code: req.body.postal_code,
  };

  Location.updateLocation(req.params.id, data, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(401).send({ message: "Not found location: " + req.params.id });
      } else {
        res
          .status(500)
          .send({ message: "Error update location: " + req.params.id });
      }
    }
    return res.status(200).send({
      message: `Location updated successfully ${data.address} ${data.road} ${data.subdistrict} ${data.district} ${data.province} ${data.postal_code}`,
    });
  });
};

const deleteLocation = (req, res)=>{
  // console.log("parameters: " + req.params.id + 
  // ", " + req.params.p1 + 
  // ", " + req.params.p2);
  Location.removeLocation(req.params.id, (err, result)=>{
      if(err){
          if(err.kind == "not_found"){
              res.status(401).send(
                  {message: "Not found location: " + req.params.id}
                  );
          }
          else{
              res.status(500).send(
                  {message: "Error delete location: " + req.params.id}
                  );
          }
      }else{
          res.send(result);
      }
  });
};
module.exports = {
  createNewLocation,
  getAllLocation,
  getLocationDetail,
  getSomeLocation,
  updateLocationCtrl,
  deleteLocation,
};
