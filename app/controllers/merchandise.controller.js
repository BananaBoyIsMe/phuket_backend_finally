const Merch = require("../models/merchandise.model");

const createNewMerch = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
  }
  const merchObject = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    img: req.body.img,
    detailed_description: req.body.detailed_description,
    url: req.body.url,
    in_stock: req.body.in_stock,
  };
  Merch.create(merchObject, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating"
      });
    } else {
      res.send(data);
    }
  });
};

const getAllMerch = (req, res) => {
  Merch.listing((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
};

const getMerchDetail = (req, res) => {
  Merch.listingDetail(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
}

const getSomeMerch = (req, res) => {
  Merch.listingSome(req.params.limit, req.params.offset, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
}

const updateMerchCtrl = (req, res) => {
  console.log("update");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  const data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    img: req.body.img,
    detailed_description: req.body.detailed_description,
    url: req.body.url,
    in_stock: req.body.in_stock,
  };

  Merch.updateMerch(req.params.id, data, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(401).send({ message: "Not found merch: " + req.params.id });
      } else {
        res
          .status(500)
          .send({ message: "Error update merch: " + req.params.id });
      }
    }
    return res.status(200).send({
      message: `Merchandise updated successfully ${data.name} ${data.description} ${data.price} ${data.img} ${data.detailed_description} ${data.url} ${data.in_stock}`,
    });
  });
};

const deleteMerch = (req, res)=>{
  // console.log("parameters: " + req.params.id + 
  // ", " + req.params.p1 + 
  // ", " + req.params.p2);
  Merch.removeMerch(req.params.id, (err, result)=>{
      if(err){
          if(err.kind == "not_found"){
              res.status(401).send(
                  {message: "Not found merch: " + req.params.id}
                  );
          }
          else{
              res.status(500).send(
                  {message: "Error delete merch: " + req.params.id}
                  );
          }
      }else{
          res.send(result);
      }
  });
};

module.exports = {
  createNewMerch,
  getAllMerch,
  getMerchDetail,
  getSomeMerch,
  updateMerchCtrl,
  deleteMerch,
};
